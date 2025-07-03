
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram, Linkedin, Mail } from 'lucide-react';

const ContactFloatingButtons = () => {
  const contacts = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "WhatsApp",
      url: "https://wa.me/918175996960",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      label: "Instagram",
      url: "https://instagram.com/batbotdk09",
      color: "bg-pink-500 hover:bg-pink-600"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/dileep-yadav-63500158",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      url: "mailto:dileepkryadav09@gmail.com",
      color: "bg-red-500 hover:bg-red-600"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {contacts.map((contact, index) => (
        <Button
          key={index}
          size="sm"
          className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${contact.color} text-white`}
          asChild
        >
          <a
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            title={contact.label}
          >
            {contact.icon}
          </a>
        </Button>
      ))}
    </div>
  );
};

export default ContactFloatingButtons;
