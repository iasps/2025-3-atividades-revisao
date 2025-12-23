'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Search, Filter, Mail, Phone, MapPin } from 'lucide-react';
import { User } from '@/types';
import { dummyApi } from '@/lib/api';

// Dados locais (variáveis) - Etapa 3 da atividade
const localUsers: User[] = [
  {
    id: 1,
    firstName: "João",
    lastName: "Silva",
    age: 28,
    gender: "male",
    email: "joao.silva@email.com",
    phone: "+55 (84) 99999-9999",
    username: "joaosilva",
    birthDate: "1995-05-15",
    image: "https://i.pravatar.cc/150?img=1",
    address: {
      address: "Rua das Flores, 123",
      city: "Natal",
      postalCode: "59000-000",
      state: "RN"
    }
  },
  {
    id: 2,
    firstName: "Maria",
    lastName: "Santos",
    age: 32,
    gender: "female",
    email: "maria.santos@email.com",
    phone: "+55 (84) 98888-8888",
    username: "mariasantos",
    birthDate: "1991-08-22",
    image: "https://i.pravatar.cc/150?img=2",
    address: {
      address: "Av. Central, 456",
      city: "Parnamirim",
      postalCode: "59140-000",
      state: "RN"
    }
  }
];

export default function UserManager() {
  // Gerenciamento de estado - Etapa 4 da atividade
  const [users, setUsers] = useState<User[]>(localUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(localUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'local' | 'api'>('local');
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Acesso à API - Etapa 5 da atividade
  const fetchUsers = async () => {
    if (viewMode === 'api') {
      setIsLoading(true);
      try {
        const data = await dummyApi.getUsers(6);
        setUsers(data.users);
        setFilteredUsers(data.users);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setUsers(localUsers);
      setFilteredUsers(localUsers);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [viewMode]);

  // Filtros e busca
  useEffect(() => {
    let result = users;
    
    if (searchTerm) {
      result = result.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (genderFilter !== 'all') {
      result = result.filter(user => user.gender === genderFilter);
    }
    
    setFilteredUsers(result);
  }, [users, searchTerm, genderFilter]);

  const addUser = () => {
    if (newUser.firstName && newUser.lastName && newUser.email) {
      const user: User = {
        id: users.length + 1,
        ...newUser,
        age: 25,
        gender: "male",
        phone: "",
        username: newUser.firstName.toLowerCase(),
        birthDate: "1998-01-01",
        image: "https://i.pravatar.cc/150",
        address: {
          address: "Nova Rua, 999",
          city: "Natal",
          postalCode: "59000-000",
          state: "RN"
        }
      };
      
      setUsers([...users, user]);
      setNewUser({ firstName: '', lastName: '', email: '' });
    }
  };

  const removeUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Gerenciador de Usuários
            </CardTitle>
            <CardDescription>
              {viewMode === 'local' 
                ? 'Gerenciando dados locais com estado' 
                : 'Usuários da API DummyJSON'}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'local' ? 'default' : 'outline'}
              onClick={() => setViewMode('local')}
              size="sm"
            >
              Dados Locais
            </Button>
            <Button
              variant={viewMode === 'api' ? 'default' : 'outline'}
              onClick={() => setViewMode('api')}
              size="sm"
            >
              API Online
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Controles de filtro e busca */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar por gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os gêneros</SelectItem>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Feminino</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="text-lg px-3 py-1">
              {filteredUsers.length} usuários
            </Badge>
          </div>
        </div>

        {/* Formulário para adicionar usuário (apenas no modo local) */}
        {viewMode === 'local' && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-bold mb-3">Adicionar Novo Usuário</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Nome"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                />
                <Input
                  placeholder="Sobrenome"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                  <Button onClick={addUser}>Adicionar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de usuários */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">Carregando usuários da API...</div>
          ) : (
            filteredUsers.map((user) => (
              <Card key={user.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.image} alt={user.firstName} />
                      <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-lg">
                            {user.firstName} {user.lastName}
                            <Badge variant="outline" className="ml-2">
                              {user.age} anos
                            </Badge>
                          </h3>
                          <div className="flex items-center gap-3 mt-2 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {user.phone}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={user.gender === 'male' ? 'default' : 'secondary'}>
                            {user.gender === 'male' ? 'Masculino' : 'Feminino'}
                          </Badge>
                          {viewMode === 'local' && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeUser(user.id)}
                            >
                              Remover
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-slate-50 rounded-md">
                        <div className="flex items-center gap-1 text-slate-700">
                          <MapPin className="h-4 w-4" />
                          <span className="font-medium">Endereço:</span>
                          <span className="ml-2">{user.address.address}, {user.address.city} - {user.address.state}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}