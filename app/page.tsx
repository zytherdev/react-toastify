'use client';

//import { useToast } from "@zyther/react-toastify";
import { useToast } from "./lib/hooks/useToast.ts"

export default function Home() {
  const toast = useToast();

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          React Toastify Demo
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => toast.success('Operação realizada com sucesso!', {
              title: 'Parabéns! 🎉'
            })}
            className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            Success
          </button>

          <button
            onClick={() => toast.error('Falha ao salvar os dados', {
              action: {
                label: 'Tentar novamente',
                onClick: () => console.log('Retry')
              }
            })}
            className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            Error
          </button>

          <button
            onClick={() => toast.warning('Atenção! Verifique os dados')}
            className="p-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
          >
            Warning
          </button>

          <button
            onClick={() => toast.info('Nova atualização disponível')}
            className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            Info
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              const id = toast.loading('Processando...');
              setTimeout(() => {
                toast.updateToast(id, {
                  type: 'success',
                  message: 'Processado com sucesso!'
                });
              }, 3000);
            }}
            className="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition"
          >
            Loading → Success
          </button>

          <button
            onClick={() => toast.dismissAll()}
            className="p-4 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
          >
            Dismiss All
          </button>
        </div>
      </div>
    </main>
  );
}