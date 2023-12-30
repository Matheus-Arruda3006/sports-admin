"use client";

import *  as z from 'zod';

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import axios from 'axios';

const formSchema = z.object({
    name: z.string().min(1)
});

export const StoreModal = () => {

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });
    

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        //TODO: Criar seção
        try {
            setLoading(true);

            const response = await axios.post('/api/stores', values);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    }

    const storeModal = useStoreModal();

    return (
        <Modal title="Crie uma seção" description="Crie uma nova seção para gerenciar novos produtos e categorias" 
        isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            <div>
                <div className='space-y-4 pb-4 py-2'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name='name' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Tênis...' {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>

                            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                                <Button variant={'destructive'} onClick={storeModal.onClose} disabled={loading}>
                                    Cancelar
                                </Button>
                                <Button variant={'default'} type='submit' disabled={loading}>
                                    Continuar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
           
        </Modal>
    );
  
};