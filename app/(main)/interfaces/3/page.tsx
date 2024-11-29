'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
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

// Simulated database of items
const items = {
  platillos: [
    { id: '1', name: '1/4 Pollo a la brasa' },
    { id: '2', name: 'Lomo Saltado' },
    { id: '3', name: 'Parrilla' },
    { id: '4', name: '1/2 Pollo a la brasa' },
    { id: '5', name: '1 Pollo a la brasa' }
  ],
  bebidas: [
    { id: 'b1', name: 'Coca Cola 500ml' },
    { id: 'b2', name: 'Inca Kola 500ml' },
    { id: 'b3', name: 'Agua mineral' },
    { id: 'b4', name: 'Chicha morada 500ml' },
    { id: 'b5', name: 'Vino tinto' }
  ]
}

const formSchema = z.object({
  type: z.enum(['platillo', 'bebida'], {
    required_error: 'Por favor seleccione un tipo'
  }),
  searchTerm: z.string().min(1, 'Por favor ingrese un término de búsqueda')
})

interface SearchResult {
  found: boolean
  name: string
  available: boolean
  loading: boolean
}

export default function VerificacionDisponibilidad() {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'platillo',
      searchTerm: ''
    }
  })

  const verificarDisponibilidad = async (
    values: z.infer<typeof formSchema>
  ) => {
    setSearchResult({ found: false, name: '', available: false, loading: true })

    await new Promise(resolve => setTimeout(resolve, 1000))

    const itemList =
      values.type === 'platillo' ? items.platillos : items.bebidas
    const item = itemList.find(item =>
      item.name.toLowerCase().includes(values.searchTerm.toLowerCase())
    )

    if (item) {
      const available = Math.random() > 0.5
      setSearchResult({
        found: true,
        name: item.name,
        available,
        loading: false
      })
    } else {
      setSearchResult({
        found: false,
        name: values.searchTerm,
        available: false,
        loading: false
      })
    }
  }

  return (
    <main className='mx-auto max-w-2xl space-y-8 pt-8'>
      <h1 className='text-center text-4xl font-bold'>
        Verificar Disponibilidad
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(verificarDisponibilidad)}
          className='space-y-6'
        >
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccione tipo' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='platillo'>Platillo</SelectItem>
                    <SelectItem value='bebida'>Bebida</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='searchTerm'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Buscar</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Search className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
                    <Input
                      placeholder='Ingrese nombre para verificar...'
                      className='pl-10'
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' className='w-full'>
            Verificar Disponibilidad
          </Button>
        </form>
      </Form>

      {searchResult && (
        <div
          className={`mt-8 rounded-lg border p-4 ${
            searchResult.loading
              ? 'animate-pulse bg-muted'
              : searchResult.found
                ? 'bg-background'
                : 'bg-destructive/10'
          }`}
        >
          {searchResult.loading ? (
            <p className='text-center'>Verificando disponibilidad...</p>
          ) : searchResult.found ? (
            <div className='space-y-2'>
              <p className='font-medium'>{searchResult.name}</p>
              <p
                className={`font-semibold ${
                  searchResult.available ? 'text-green-600' : 'text-destructive'
                }`}
              >
                {searchResult.available ? 'Disponible' : 'No Disponible'}
              </p>
            </div>
          ) : (
            <p className='text-center text-destructive'>
              No se encontraron elementos que coincidan con &quot;
              {searchResult.name}&quot;
            </p>
          )}
        </div>
      )}

      {/* show bebida and platillos */}
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <h2 className='text-xl font-bold'>Platillos</h2>
          <ul className='space-y-2'>
            {items.platillos.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className='text-xl font-bold'>Bebidas</h2>
          <ul className='space-y-2'>
            {items.bebidas.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
