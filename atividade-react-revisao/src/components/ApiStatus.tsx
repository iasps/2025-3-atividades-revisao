'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, WifiOff, Server } from 'lucide-react';
import { dummyApi } from '@/lib/api';

export default function ApiStatus() {
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [testResult, setTestResult] = useState<any>(null);

  const testApiConnection = async () => {
    setApiStatus('loading');
    try {
      const result = await dummyApi.testApi();
      setTestResult(result);
      setApiStatus('success');
    } catch (error) {
      console.error('Erro ao testar API:', error);
      setApiStatus('error');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Status da API DummyJSON
        </CardTitle>
        <CardDescription>
          Teste a conexão com a API externa
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {apiStatus === 'success' ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : apiStatus === 'error' ? (
              <WifiOff className="h-5 w-5 text-red-500" />
            ) : (
              <Wifi className="h-5 w-5 text-slate-400" />
            )}
            <span className="font-medium">
              {apiStatus === 'idle' && 'Clique para testar'}
              {apiStatus === 'loading' && 'Testando conexão...'}
              {apiStatus === 'success' && 'Conexão estabelecida!'}
              {apiStatus === 'error' && 'Falha na conexão'}
            </span>
          </div>
          <Badge variant={
            apiStatus === 'success' ? 'default' :
            apiStatus === 'error' ? 'destructive' :
            'outline'
          }>
            {apiStatus === 'success' ? 'Online' :
             apiStatus === 'error' ? 'Offline' :
             'Testar'}
          </Badge>
        </div>

        <Button 
          onClick={testApiConnection}
          disabled={apiStatus === 'loading'}
          className="w-full"
        >
          {apiStatus === 'loading' ? 'Testando...' : 'Testar Conexão com API'}
        </Button>

        {testResult && (
          <div className="p-3 bg-slate-50 rounded-md">
            <pre className="text-sm overflow-auto">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}