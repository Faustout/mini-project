/** @format */
import Link from "next/link";

function NavbarCmponents() {
  return (
    <>
      <div className="flex sticky top-0 justify-between h-[80px] p-6 bg-black items-center z-10">
        {/* logo */}
        <Link href="" className="text-white font-semibold text-xl">
          Tiket
        </Link>

        {/* menus */}
        <div className="flex gap-4 items-center">
          <Link
            href=""
            className="font-semibold text-white hover:bg-white hover:text-black p-1 px-2 rounded"
          >
            Home
          </Link>
          <Link
            href=""
            className="font-semibold text-white hover:bg-white hover:text-black p-1 px-2 rounded"
          >
            Shop
          </Link>
        </div>

        {/* login and register */}
        <div className="flex gap-4 items-center">
          <Link
            href={"/auth/login"}
            className="bg-[#23A6F0] hover:bg-white font-semibold text-white hover:text-[#23A6F0] p-1 px-3 rounded"
          >
            Login
          </Link>
          <Link
            href={"/auth/register"}
            className="font-semibold hover:text-green-500 text-white bg-green-500 p-1 px-3 rounded hover:bg-white"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
}
export default NavbarCmponents;
