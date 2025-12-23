import ProductList from '@/components/ProductList';
import UserManager from '@/components/UserManager';
import ApiStatus from '@/components/ApiStatus';
import { School, Code, Database } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Cabeçalho */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-4">
          <School className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Atividade - React - Revisão</h1>
            <p className="text-slate-600">
              CNAT-IFRN • POS • Infoweb • Prof. L.A Minora • Aluna: Iasmim Souto
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
            <Code className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="font-semibold">Tech Stack</h3>
              <p className="text-sm text-slate-600">Next.js + TypeScript + Tailwind + Shadcn/ui</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
            <Database className="h-5 w-5 text-green-500" />
            <div>
              <h3 className="font-semibold">API Externa</h3>
              <p className="text-sm text-slate-600">DummyJSON REST API</p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-1">Objetivo da Atividade</h3>
            <p className="text-sm text-blue-700">
              Revisar conteúdos do 1º semestre: componentes, estado, hooks e consumo de APIs.
            </p>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-6xl mx-auto space-y-8">
        <section>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">📋 Etapas Implementadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {[
                { num: 1, text: 'Fork do repositório' },
                { num: 2, text: 'Projeto React criado' },
                { num: 3, text: 'UIs com dados locais' },
                { num: 4, text: 'Gerenciamento de estado' },
                { num: 5, text: 'Acesso à API externa' }
              ].map((step) => (
                <div key={step.num} className="p-3 bg-white rounded border text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    {step.num}
                  </div>
                  <p className="text-sm">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1: Lista de Produtos */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">🛍️ Lista de Produtos</h2>
            <ProductList />
          </div>

          {/* Coluna 2: Gerenciador de Usuários e Status */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">👥 Gerenciador de Usuários</h2>
              <UserManager />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">🔌 Status da API</h2>
              <ApiStatus />
            </div>

            {/* Instruções */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-bold text-amber-800 mb-2">🎯 Como Testar</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Clique em "API Online" para buscar dados reais</li>
                <li>• Adicione/remova produtos do carrinho</li>
                <li>• Busque/filtre usuários</li>
                <li>• Teste a conexão com a API</li>
                <li>• Veja os dados sendo atualizados em tempo real</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="max-w-6xl mx-auto mt-12 pt-6 border-t text-center text-slate-500 text-sm">
        <p>Atividade de revisão - Programação Orientada a Serviços • IFRN Campus Natal-Central</p>
        <p className="mt-1">Implementado com Next.js 14, TypeScript, Tailwind CSS e Shadcn/ui</p>
      </footer>
    </div>
  );
}