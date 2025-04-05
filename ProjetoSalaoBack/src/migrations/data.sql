create table if not exists salao_agendamento(
	id serial primary key,
	id_cliente int not null,
	id_endereco int not null,
	servico varchar(50) not null,
	forma_pagamento varchar(30) not null,
	observacoes text,
	confirmacao varchar(20),
	data_hora timestamp,
	constraint fk_cliente_agendamento_id foreign key (id_cliente) references salao_cliente(id),
	constraint fk_endereco_agendamento_id foreign key (id_endereco) references salao_enderecos(id)
);



create table if not exists salao_cliente (
	id serial primary key,
	nome varchar(40) not null,
	idade int not null,
	contato char(15),
	cpf char(15)
);



create table if not exists salao_enderecos (
	id serial primary key,
	id_cliente int not null,
	cep char(8) not null,
	logradouro varchar(60),
	numero varchar(10) not null,
	complemento varchar(60),
	bairro varchar(30) not null,
	localidade varchar(50) not null,
	uf varchar(2) not null,
	ponto_referencia text,
	constraint fk_id_cliente foreign key (id_cliente) references salao_cliente(id)
);
