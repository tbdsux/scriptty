// https://github.com/inertiajs/inertia/discussions/2046#discussioncomment-12741422

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

type TForm = Record<string, unknown>
export type FormContextType = {
  data: TForm
  setData: <K extends keyof TForm>(key: K, value: TForm[K]) => void
  errors: Partial<Record<keyof TForm, string>>
}

// Define como unknown para permitir atribuição genérica
const FormContext = React.createContext<FormContextType>({} as FormContextType)

const Form = ({
  children,
  form,
}: {
  children: React.ReactNode
  form: FormContextType
}) => (
  <FormContext.Provider value={form as FormContextType}>
    {children}
  </FormContext.Provider>
)

type FormFieldContextValue<TFieldName extends string> = {
  name: TFieldName
}

const FormFieldContext = React.createContext<FormFieldContextValue<string> | null>(null)

const FormField = <TFieldName extends string>({
  name,
  children,
}: {
  name: TFieldName
  children: React.ReactNode
}) => (
  <FormFieldContext.Provider value={{ name }}>
    {children}
  </FormFieldContext.Provider>
)

type FormItemContextValue = { id: string }

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

const FormItem = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const form = React.useContext(FormContext)

  if (!fieldContext || !itemContext) {
    throw new Error("useFormField must be used within <FormField> and <FormItem>")
  }

  if (!form) {
    throw new Error("useFormField must be used within <Form>")
  }

  const { name } = fieldContext
  const { id } = itemContext

  const value = form.data[name as keyof TForm]
  const setData = form.setData
  const error = form.errors[name as keyof TForm]

  return {
    id,
    name,
    value,
    setData,
    error,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  }
}

const FormLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) => {
  const { formItemId, error } = useFormField()
  return (
    <Label
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}


const FormInput = (props: React.ComponentProps<'input'>) => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { formItemId, formDescriptionId, formMessageId, name, setData, value, error } = useFormField()
  React.useEffect(() => {
    if(error) inputRef.current?.focus()
  },[error])
  return (
    <Input
      id={formItemId}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
      }
      aria-invalid={!!error}
      value={value as string}
      onChange={(e) => setData(name, e.target.value)}
      {...props}
      ref={inputRef}
    />
  )
}


function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

const FormDescription = ({ className, ...props }: React.ComponentProps<'p'>) => {
  const { formDescriptionId } = useFormField()
  return (
    <p
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
}

const FormMessage = ({ className, children, ...props }: React.ComponentProps<'p'>) => {
  const { error, formMessageId } = useFormField()
  const body = error ?? children

  if (!body) return null

  return (
    <p
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  Form, FormControl, FormDescription, FormField, FormInput, FormItem,
  FormLabel, FormMessage, useFormField
}

