import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter;

export async function getEtherealTransport(): Promise<Transporter> {
  if (!transporter) {
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    console.log("Ethereal account info:");
    console.log(`User: ${testAccount.user}`);
    console.log(`Pass: ${testAccount.pass}`);
    console.log("Preview URL will appear in email logs when sending links.");
  }

  return transporter;
}
