import React from "react";
import { useShop } from "../context/ShopContext";
import { getWhatsAppLink } from "../utils/storage";
import { MessageSquare } from "lucide-react";

export default function WhatsAppButton() {
  const { shopInfo } = useShop();

  const defaultMessage = `Hello ${shopInfo.name}, I want to know more about your specialty coffee menu and table reservations!`;

  return (
    <a
      href={getWhatsAppLink(shopInfo.whatsapp, defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp-btn"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare size={28} />
      <span className="whatsapp-tooltip">Chat on WhatsApp</span>
    </a>
  );
}
