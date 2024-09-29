package processor

import (
	"fmt"
	"log"
	"os"

	"github.com/go-mail/mail"
)

func SendMail(sender string) error {
	log.Println("Sending mail...")
	account := os.Getenv("MAIL_ACCOUNT")
	pass := os.Getenv("MAIL_PASS")
	signaturePath := os.Getenv("MAIL_SIGNATURE")
	if account == "" || pass == "" || signaturePath == "" {
		return fmt.Errorf("error: SendMail\tMail config missing")
	}

	if sender == "" {
		return fmt.Errorf("error: SendMail\tMail details missing")
	}

	//personal notification
	m1 := mail.NewMessage()
	m1.SetHeader("From", account)
	m1.SetHeader("To", account)
	m1.SetHeader("Subject", fmt.Sprintf("%s is trying to contact you", sender))
	m1.SetBody("text/html", fmt.Sprintf(`
		<html>
		<body>
			<h1>%s is contacting you!</h1>
		</body>
		</html>
	`, sender))

	d1 := mail.NewDialer("smtp.gmail.com", 587, account, pass)
	if err := d1.DialAndSend(m1); err != nil {
		fmt.Println(fmt.Sprintf("error sending personal notification for %s", sender))
		return err
	}

	//sender notification
	m2 := mail.NewMessage()
	m2.SetHeader("From", account)
	m2.SetHeader("To", sender)
	m2.SetHeader("Subject", "📌I'll get back to you soon")
	m2.SetBody("text/html", `
		<!DOCTYPE html>
		<html>
		<body>
			<p>Thank you for contacting me. I've received your email and will reach out to you soon.</p>
			<p>Best regards,</p>
			</br>
			<p>--<i>this is an automated response</i>--</p>
			<img src="cid:signature" alt="Signature" />
		</body>
		</html>
	`)
	signatureHeader := map[string][]string{"Content-ID": {"<signature>"}}
	m2.Attach(signaturePath, mail.SetHeader(signatureHeader))

	d2 := mail.NewDialer("smtp.gmail.com", 587, account, pass)
	if err := d2.DialAndSend(m2); err != nil {
		fmt.Println(fmt.Sprintf("error sending notification to %s", sender))
		return err
	}

	return nil
}
