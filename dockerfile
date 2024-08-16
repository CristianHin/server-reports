# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install --only=production

# Copia el resto del código fuente de la aplicación al contenedor
COPY dist ./dist
COPY prisma ./prisma
COPY fonts ./fonts

COPY .env .env

RUN npx prisma generate

# Expone el puerto 3000 para que la aplicación esté disponible
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]