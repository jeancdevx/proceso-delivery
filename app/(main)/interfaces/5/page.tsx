'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'

const errorTypes = [
  { value: 'delivery_delay', label: 'Retraso en la Entrega' },
  { value: 'wrong_order', label: 'Orden Incorrecta' },
  { value: 'missing_items', label: 'Artículos Faltantes' },
  { value: 'payment_issue', label: 'Problema de Pago' },
  { value: 'quality_issue', label: 'Problema de Calidad' },
  { value: 'system_error', label: 'Error del Sistema' },
  { value: 'other', label: 'Otro' }
] as const

const formSchema = z.object({
  orderNumber: z
    .string()
    .min(1, 'Order number is required')
    .regex(/^\d+$/, 'Must be a valid order number'),
  clientName: z.string().min(2, 'Client name is required'),
  clientPhone: z
    .string()
    .min(9, 'Phone number must be at least 9 digits')
    .regex(/^\d+$/, 'Must be a valid phone number'),
  errorType: z.enum(errorTypes.map(t => t.value) as [string, ...string[]], {
    required_error: 'Please select an error type'
  }),
  errorDescription: z
    .string()
    .min(10, 'Please provide a detailed description of the error'),
  actionTaken: z
    .string()
    .min(10, 'Please describe the action taken to resolve the issue'),
  resolved: z.boolean().default(false)
})

type FormValues = z.infer<typeof formSchema>

export default function ErrorReport() {
  const [success, setSuccess] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: '',
      clientName: '',
      clientPhone: '',
      errorType: undefined,
      errorDescription: '',
      actionTaken: '',
      resolved: false
    }
  })

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Error report submitted:', data)
    setSuccess(true)

    // Reset form after 2 seconds
    setTimeout(() => {
      form.reset()
      setSuccess(false)
    }, 2000)
  }

  return (
    <main className='mx-auto max-w-2xl space-y-8 py-8'>
      <div className='space-y-2 text-center'>
        <h1 className='text-4xl font-bold'>Generar reporte de errores</h1>
        <p className='text-muted-foreground'>
          Documenta los errores y problemas encontrados en los pedidos
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='orderNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Orden</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter order number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='errorType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Error</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select error type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {errorTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='clientName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter client name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='clientPhone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono del Cliente</FormLabel>
                  <FormControl>
                    <Input
                      type='tel'
                      placeholder='Enter client phone'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='errorDescription'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción del Error</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Describe the error in detail'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provee una descripción detallada del error
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='actionTaken'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Acción Tomada para Resolver el Problema</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Describe the actions taken to resolve the issue'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe las acciones tomadas para resolver el problema
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='resolved'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <input
                    type='checkbox'
                    checked={field.value}
                    onChange={field.onChange}
                    className='size-4 rounded border-gray-300'
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Marcar como Resuelto</FormLabel>
                  <FormDescription>
                    Marca esta casilla para confirmar que el problema ha sido
                    resuelto
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full' disabled={success}>
            {success ? (
              <span className='flex items-center gap-2'>
                <Check className='size-4' />
                Report Submitted
              </span>
            ) : (
              'Submit Error Report'
            )}
          </Button>
        </form>
      </Form>
    </main>
  )
}
