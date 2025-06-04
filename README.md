nota de TUKI, cuando meta un cambio o algo y no se vea, actualize la pagina y se vera reflejado
Segunda nota de TUKI (alias Carlos Zambrano)
# Sistema Escolar

## Descripción
Este es un proyecto de un sistema escolar desarrollado con React, Node.js y PostgreSQL. El sistema permite gestionar información sobre alumnos, cursos, inscripciones y notas. A través de una API REST, se pueden realizar operaciones básicas (altas, bajas, consultas y modificaciones) sobre cada entidad.

## Tecnologías utilizadas
- **Frontend**: React, Axios
- **Backend**: Node.js, Express
- **Base de datos**: PostgreSQL
- **Herramientas**: pgAdmin o DBeaver para gestionar la base de datos

## Estructura del Proyecto
1. **Frontend (React)**:
   - La aplicación tiene componentes para cada sección: Alumnos, Cursos, Inscripciones, Notas.
   - Funcionalidades implementadas:
     - Consultar registros
     - Agregar nuevos registros
     - Editar registros existentes
     - Eliminar registros
2. **Backend (Node.js + Express)**:
   - API RESTful que proporciona las operaciones CRUD para Alumnos, Cursos, Inscripciones y Notas.
   - Conexión con PostgreSQL a través de la librería `pg`.
   
## Instalación y Configuración

### 1. Clonación del Repositorio

```bash
git clone https://github.com/BlykeSeven/PROYECTO_CARLOS_JOAQUIN_RADAME.git
cd PROYECTO_CARLOS_JOAQUIN_RADAME
2. Instalación de Dependencias
Backend
bash

cd backend
npm install
Frontend
bash

cd frontend
npm install
3. Configuración de la Base de Datos
Crea una base de datos en PostgreSQL.

Usa pgAdmin o postman

Asegúrate de tener las tablas necesarias: alumnos, cursos, inscripciones, notas.

SEGUNDA NOTA DE TUKI :) ponga este comando a la hora de crear las tablas en sql ya que precisamente deben estar en este orden por las relaciones y las claves foraneas asi todo el codigo funcionara correctamente: este error me tomo horas en darme cuenta :c

-- Tabla de Materias (debe ir primero porque otras tablas dependen de ella)
CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla de Alumnos
CREATE TABLE alumnos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    direccion VARCHAR(255)
);

-- Tabla de Cursos
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla de Maestros (depende de la tabla de materias)
CREATE TABLE maestros (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    materia_id INTEGER REFERENCES materias(id)
);

-- Tabla de Inscripciones (depende de las tablas de alumnos y cursos)
CREATE TABLE inscripciones (
    id SERIAL PRIMARY KEY,
    alumno_id INTEGER REFERENCES alumnos(id),
    curso_id INTEGER REFERENCES cursos(id),
    fecha_inscripcion DATE NOT NULL
);

-- Tabla de Notas (depende de las tablas de alumnos y materias)
CREATE TABLE notas (
    id SERIAL PRIMARY KEY,
    alumno_id INTEGER REFERENCES alumnos(id),
    materia_id INTEGER REFERENCES materias(id),
    nota DECIMAL(5,2)
);


4. Configuración de Variables de Entorno
Crea un archivo .env en la raíz del proyecto con las siguientes variables para la configuración de la base de datos:

tercera nota de tuki:) Algo obvio pero tal vez sirva recordarle: al crear el archivo .env pondra su usuario, contraseña y el nombre de la base de datos que creo en pgadmin al que tiene usted, y otra cosa la contraseña de preferencia ponerla entre comillas: "contraseña" esto porque a veces no la jala sin estas, asi que es mejor forzarla como "string" para que funcione al 100%

env

DB_USER=tu_usuario
DB_HOST=localhost
DB_NAME=tu_base_de_datos
DB_PASSWORD=tu_contraseña
DB_PORT=5432
5. Ejecución del Proyecto
Backend
bash

cd backend
npm start
El backend estará disponible en http://localhost:3001.

4 nota de tuki:) Probablemente mi ultima nota y la despedida de esta bonita materia:) pero en fin, a la hora de instalar las dependencias y correr el programa o como se llame, cheque bien en que puerto o host lo pone en mi caso fue 3000 y 3001 para front y back respectivamente, en caso de tener otro numero, bueno, va tener que cambiar todo aquello que que este en un puerto distinto, por el que le haya aparecido a usted; ejemplo lo mio esta en 3000 y 3001, pero si le sale en 4000 0 5000 tendra que cambiar esos datos respectivamentes por los suyos para que funcione, eso o forzar con un comando que corra en ese puerto:) de aqui en adelante o atras lo que le salga de puerto en el host lo tendra que modificar usted, y como ultima nota, todo funciona a la perfeccion lo probe absolutamente todo y todo esta al 100% segun lo que pidio el proyecto 6 apis todas conectadas, con sus funciones de editar, post, get, delete, etc, en caso de que no quiera hacer todo el programa o checarlo todo en uno, le aseguro que todo esta corriendo a la perfeccion :)

Frontend
bash

cd frontend
npm start
El frontend estará disponible en http://localhost:3000.

Funcionalidades
1. Gestión de Alumnos
Consultar: Muestra una lista de todos los alumnos.

Agregar: Permite agregar nuevos alumnos al sistema.

Editar: Permite editar la información de los alumnos.

Eliminar: Permite eliminar a un alumno.

2. Gestión de Cursos
Consultar: Muestra una lista de todos los cursos.

Agregar: Permite agregar nuevos cursos al sistema.

Editar: Permite editar la información de los cursos.

Eliminar: Permite eliminar un curso.

3. Gestión de Inscripciones
Consultar: Muestra las inscripciones de los alumnos a los cursos.

Agregar: Permite inscribir a un alumno en un curso.

Editar: Permite editar la inscripción de un alumno a un curso.

Eliminar: Permite eliminar una inscripción.

4. Gestión de Notas
Consultar: Muestra las notas de los alumnos en cada materia.

Agregar: Permite agregar notas para los alumnos.

Editar: Permite editar las notas de los alumnos.

Eliminar: Permite eliminar las notas de los alumnos.

Miembros del Equipo
Carlos Alberto Zambrano Mosqueda
Radames Hernandez Soto
Joaquin Tiznado Gallegos

TUKI WAS HERE, como dato curioso en caso de que haya bajado el archivo el alumno que se ve registrado de forma extraña esta hecho aproposito en un lenguaje de señas, estaba aburrido y no tenia nada que hacer asi que solamente lo puse por poner, sin mas dilacion esto ha sido el proyecto, todo fue hecho entre todos:)

ATTE: TUKI 

TUKINOTICIA: ultima nota al guardar el archivo, el readme lo hize en chat gpt porque me dio pereza escribir a mano, pero como ve, lei todo lo que puso y lo configure segun mis datos, y le di las instrucciones que hacen necesarias para su instalacion o los datos a poner y el orden para que todo funcione:)