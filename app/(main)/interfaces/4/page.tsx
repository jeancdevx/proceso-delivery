'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
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

const formSchema = z.object({
  orderNumber: z
    .string()
    .min(1, 'Order number is required')
    .regex(/^\d+$/, 'Must be a valid order number'),
  customerName: z.string().min(2, 'Customer name is required'),
  deliveryAddress: z.string().min(5, 'Delivery address is required'),
  confirmDelivery: z.boolean().refine(val => val, {
    message: 'You must confirm the delivery'
  }),
  paymentConfirmed: z.boolean().refine(val => val, {
    message: 'You must confirm the payment'
  }),
  deliveryNotes: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

export default function DeliveredOrderForm() {
  const [success, setSuccess] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: '',
      customerName: '',
      deliveryAddress: '',
      confirmDelivery: false,
      paymentConfirmed: false,
      deliveryNotes: ''
    }
  })

  const onSubmit = async (data: FormValues) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Order marked as delivered:', data)
    setSuccess(true)
  }

  return (
    <main className='mx-auto max-w-2xl space-y-8 pt-8'>
      <h1 className='text-center text-4xl font-bold'>
        Registrar Entrega de Pedido
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='orderNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de Orden</FormLabel>
                <FormControl>
                  <Input placeholder='Enter order number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='customerName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Cliente</FormLabel>
                <FormControl>
                  <Input placeholder='Enter customer name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='deliveryAddress'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direccion de Entrega</FormLabel>
                <FormControl>
                  <Input placeholder='Enter delivery address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='deliveryNotes'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Notas de Entrega{' '}
                  <span className='text-muted-foreground'>(Opcional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Any additional notes about the delivery'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Añade cualquier nota adicional sobre la entrega
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='space-y-4 rounded-lg border p-4'>
            <FormField
              control={form.control}
              name='confirmDelivery'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Confirmar delivery</FormLabel>
                    <FormDescription>
                      Marca esta casilla para confirmar la entrega
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='paymentConfirmed'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Confirmar pago</FormLabel>
                    <FormDescription>
                      Marca esta casilla para confirmar el pago
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button type='submit' className='w-full' disabled={success}>
            {success ? (
              <span className='flex items-center gap-2'>
                <Check className='size-4' />
                Order Registered
              </span>
            ) : (
              'Register Delivered Order'
            )}
          </Button>
        </form>
      </Form>
    </main>
  )
}
