const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
    console.log(req.body);

    // GMAIL
    // const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         user: "*******@gmail.com",
    //         pass: "**********"
    //     }
    // });

    // Custom Domain
    const transporter = nodemailer.createTransport({
        host: "smtp.********",
        port: "***",
        auth: {
            user: "name@yourdomain.co.za",
            pass: "*********"
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: "johnrodwin@gmail.com", // change depending on what email you use
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.log(error);
            res.send(error);
        } else {
            console.log("Email sent. " + info.response);
            res.send("success");
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})