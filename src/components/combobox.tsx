"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

interface ComboboxProps {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function CustomCombobox({
  label,
  options,
  value,
  onChange,
  placeholder = "Selecione uma opção",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const handlePopoverClose = () => {
    setOpen(false)
  }

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            onClick={() => setOpen(!open)}
          >
            {value || placeholder}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 max-h-60 overflow-y-auto"
          onClick={handlePopoverClose}
        >
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
