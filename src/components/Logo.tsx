import Image from "next/image";
// import logo from '/assets/images/logo.png';

function Logo() {
  return (
    <Image
      src='/assets/images/logo.png'
      alt="Logo"
      width={200}
      height={300}
    />
  )
}
export default Logo