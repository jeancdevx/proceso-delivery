'use client'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
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
  platillos: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number().min(1, 'Quantity must be at least 1')
      })
    )
    .min(1, {
      message: 'You must select at least one item.'
    }),
  bebidas: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number().min(1, 'Quantity must be at least 1')
      })
    )
    .default([])
})

const platillos = [
  { id: '1', label: '1/4 Pollo a la brasa' },
  { id: '2', label: 'Lomo Saltado' },
  { id: '3', label: 'Parrilla' },
  { id: '4', label: '1/2 Pollo a la brasa' },
  { id: '5', label: '1 Pollo a la brasa' }
]

const bebidas = [
  { id: 'b1', label: 'Coca Cola 500ml' },
  { id: 'b2', label: 'Inca Kola 500ml' },
  { id: 'b3', label: 'Agua mineral' },
  { id: 'b4', label: 'Chicha morada 500ml' },
  { id: 'b5', label: 'Vino tinto' }
]

export default function Home() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platillos: [],
      bebidas: []
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    router.push('/')
  }

  return (
    <main className='mx-auto flex max-w-5xl flex-col gap-y-8 pt-8'>
      <h1 className='text-center text-4xl font-bold'>
        Ingresar datos de compra
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid grid-cols-2 gap-x-4 gap-y-8'
        >
          <FormField
            control={form.control}
            name='platillos'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platillos</FormLabel>

                <FormDescription>
                  Seleccione los platillos que desea comprar.
                </FormDescription>

                <div className='mt-2 flex flex-col gap-4'>
                  {platillos.map(platillo => {
                    const selected = field.value?.find(
                      item => item.id === platillo.id
                    )

                    return (
                      <div
                        key={platillo.id}
                        className='flex items-center gap-4'
                      >
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <Checkbox
                              checked={Boolean(selected)}
                              onCheckedChange={checked => {
                                if (checked) {
                                  field.onChange([
                                    ...field.value,
                                    { id: platillo.id, quantity: 1 }
                                  ])
                                } else {
                                  field.onChange(
                                    field.value?.filter(
                                      item => item.id !== platillo.id
                                    )
                                  )
                                }
                              }}
                            />
                          </FormControl>

                          <FormLabel className='font-normal'>
                            {platillo.label}
                          </FormLabel>
                        </FormItem>

                        {selected && (
                          <Input
                            type='number'
                            min={1}
                            className='w-20'
                            value={selected.quantity}
                            onChange={e => {
                              const quantity = parseInt(e.target.value) || 0
                              field.onChange(
                                field.value.map(item =>
                                  item.id === platillo.id
                                    ? { ...item, quantity }
                                    : item
                                )
                              )
                            }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='bebidas'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bebidas (Opcional)</FormLabel>
                <FormDescription>
                  Seleccione las bebidas que desea comprar.
                </FormDescription>
                <div className='mt-2 flex flex-col gap-4'>
                  {bebidas.map(bebida => {
                    const selected = field.value?.find(
                      item => item.id === bebida.id
                    )

                    return (
                      <div key={bebida.id} className='flex items-center gap-4'>
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <Checkbox
                              checked={Boolean(selected)}
                              onCheckedChange={checked => {
                                if (checked) {
                                  field.onChange([
                                    ...field.value,
                                    { id: bebida.id, quantity: 1 }
                                  ])
                                } else {
                                  field.onChange(
                                    field.value?.filter(
                                      item => item.id !== bebida.id
                                    )
                                  )
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {bebida.label}
                          </FormLabel>
                        </FormItem>

                        {selected && (
                          <Input
                            type='number'
                            min={1}
                            className='w-20'
                            value={selected.quantity}
                            onChange={e => {
                              const quantity = parseInt(e.target.value) || 0
                              field.onChange(
                                field.value.map(item =>
                                  item.id === bebida.id
                                    ? { ...item, quantity }
                                    : item
                                )
                              )
                            }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='col-span-2'>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
