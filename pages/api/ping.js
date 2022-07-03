import axios from "axios";

const sendEmail = async () => {
  const csrfUrl = "http://localhost:3000/api/auth/csrf";
  const csrfResponse = await axios.get(csrfUrl);
  const { data: csrfData } = await csrfResponse;
  const csrfToken = csrfData?.csrfToken;
  const emailUrl = "http://localhost:3000/api/auth/signin/email";

  const res = await fetch(emailUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: {
      email: "xyz@gmail.com",
      csrfToken: csrfToken,
      callbackUrl: "/",
      json: true,
    },
  });
  const data = await res.text();
  console.log("Data: ", data);
};

export default async function subscribe(req, res) {
  try {
    await sendEmail();
    res.status(201).json({ message: "Email sent.." });
  } catch (error) {
    return res
      .status(400)
      .json({ error: `Something went wrong. Error: ${error}` });
  }
}
