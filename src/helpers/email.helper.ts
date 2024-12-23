import { envConf } from "../configs/env.config";
import Mailgen from "mailgen";

const emailTemplate = (toUserEmail: string, emailToken: string) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: envConf.DB_NAME,
      link: envConf.APP_URL,
      logo: `${envConf.APP_URL}/assets/metasave_logo.png`,
      copyright: "Copyright © 2022 Tran Nguyen Thuong Truong.",
    },
  });

  const urlConfirm = `${envConf.APP_URL}/api/auth/verify/${emailToken}`;

  const email = {
    body: {
      name: toUserEmail,
      intro: "Welcome to Metasave! We're very excited to have you on board.",
      action: {
        instructions:
          "To get started with Metasave, please click confirm your account button below:",
        button: {
          color: "#22BC66",
          text: "✉ Confirm your account",
          link: urlConfirm,
        },
      },
      signature: "Sincerely",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
  return mailGenerator.generate(email);
};

export const confirmEmailMsg = (toUserEmail: string, emailToken: string) => {
  return {
    from: envConf.EMAIL_USERNAME,
    to: toUserEmail,
    subject: "Confirm your email",
    html: emailTemplate(toUserEmail, emailToken),
  };
};
