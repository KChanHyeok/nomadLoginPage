import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

const logout = async () => {
  "use server";
  const session = await getSession();
  session.destroy();
  redirect("/");
};

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: { id: session.id },
    });
    if (user) {
      return user;
    }
  }
};

export default async function NavBar() {
  const user = await getUser();
  return (
    <div className="flex flex-col  gap-10">
      <div className=" flex justify-between gap-8 w-full bg-slate-100 p-5 rounded-xl items-center ">
        <span className="font-bolds text-xl">환영합니다 {user?.username}님</span>
        <form action={logout}>
          <button className="bg-yellow-200 py-2 px-4 rounded-xl hover:bg-yellow-300 duration-700">로그아웃</button>
        </form>
      </div>
    </div>
  );
}
