import React, { useState } from "react";
import AddItemButton from "./styles";
import NewItemForm from "./NewItemForm";

interface AddNewItemProps {
  onAdd(text: string): void
  toggleButtonText: string
  dark: boolean
}

export default function AddNewItem(props: AddNewItemProps) {
  const [showForm, setShowForm] = useState(false);
  const { onAdd, toggleButtonText, dark} = props

  let darkClass = dark ? 'dark' : 'light'

  if (showForm) {
    // show item creation form
    return (
        <NewItemForm  onAdd={text => {
            onAdd(text)
            setShowForm(false)
        }}/>
    )
  }

  return (
    <AddItemButton className={darkClass} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  )
}
