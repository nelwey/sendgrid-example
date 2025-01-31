import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
    try {
        console.log("Incoming request to send email...");

        const { to, full_name } = await req.json();
        console.log("Email Details:", { to, full_name });

        console.log("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY ? "Exists ✅" : "Missing ❌");
        console.log("SENDGRID_TEMPLATE_ID:", process.env.SENDGRID_TEMPLATE_ID ? "Exists ✅" : "Missing ❌");

        const msg = {
            to,
            from: "andres.bonilla@qallta.com",
            templateId: process.env.SENDGRID_TEMPLATE_ID,
            dynamicTemplateData: { full_name },
        };

        await sgMail.send(msg);
        console.log("Email sent successfully ✅");

        return NextResponse.json({ success: true, message: "Email sent!" });
    } catch (error) {
        console.error("SendGrid error:", error.response?.body || error);
        return NextResponse.json(
            { success: false, message: "Error sending email", error: error.response?.body },
            { status: 500 }
        );
    }
}
