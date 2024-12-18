"use server"
import { handleError } from '@/lib/utils';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import prisma from "@/lib/prisma";
import { getUserById, updateCredits } from './user.actions';

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const amount = Number(transaction.amount)*100;
  
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
          unit_amount: amount,
          product_data: {
            name: transaction.plan
          }
        },
        quantity: 1
      }
    ],
    metadata: {
      plan: transaction.plan,
      credits: transaction.credits,
      buyerId: transaction.buyerId
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
  });

  redirect(session.url!);
}

export async function createTransaction(transaction: CreateTransactionParams) {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
      }
    });

    const user = await prisma.user.findUnique({
      where: { id: transaction.buyerId },
    });

    if (!user) {
      throw new Error(`User with ID ${transaction.buyerId} not found`);
    }

    let updatedCredits = (user.creditBalance ?? 0) + transaction.credits; 

    await updateCredits(transaction.buyerId, updatedCredits);

    return JSON.parse(JSON.stringify(newTransaction));
  }
  catch(err) {
    handleError(err);
  }
}