import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

const secretAccessKey = process.env.SECRET_ACCESS_KEY || "";
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (name.length < 3) {
      return new NextResponse("Name must be at least 3 letters long", {
        status: 403,
      });
    }
    if (!email.length) {
      return new NextResponse("Enter Email", { status: 403 });
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!emailRegex.test(email)) {
      return new NextResponse("Email is invalid", { status: 403 });
    }

    if (!passwordRegex.test(password)) {
      return new NextResponse(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
        { status: 403 }
      );
    }

    const hashed_password = await bcrypt.hash(password, 10);
    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword: hashed_password,
      },
    });

    const accessToken = jwt.sign({ _id: user.id }, secretAccessKey);
    const formattedData = {
      profile_img: user?.profile_img,
      fullname: user?.name,
      access_token: accessToken,
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.log("[SIGN_UP_ERROR]: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
