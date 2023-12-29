"use client";

import *  as z from 'zod';

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    name: z.string().min(1)
});

export const StoreModal = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });
    

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        //TODO: Criar seção
        console.log(values);
    }

    const storeModal = useStoreModal();

    return (
        <Modal title="Crie uma seção" description="Crie uma nova seção para gerenciar novos produtos e categorias"      isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            <div>
                <div className='space-y-4 pb-4 py-2'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name='name' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Tênis...' {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>

                            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                                <Button variant={'destructive'} onClick={storeModal.onClose}>
                                    Cancelar
                                </Button>
                                <Button variant={'default'} type='submit'>
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