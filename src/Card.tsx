import React from "react";
import { CardContainer } from "./styles";

interface CardProps {
  text: string;
}

export function Card({ text }: CardProps) {
  return <CardContainer>{text}</CardContainer>;
}
