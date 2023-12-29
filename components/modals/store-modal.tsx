"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {

    const storeModal = useStoreModal();

    return (
        <Modal title="Crie uma seção" description="Crie uma nova seção para gerenciar novos produtos e categorias"      isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            Future create Store Form
        </Modal>
    );
  
};