"use server";

export default async function login(prevState: any, formData: FormData) {
  await new Promise((resolve, rejects) => setTimeout(resolve, 1000));
  if (formData.get("password") !== "1234") {
    return {
      message: "",
      errors: ["Wrong password"],
    };
  } else {
    return {
      message: "Welcome back!",
      errors: [],
    };
  }
}
