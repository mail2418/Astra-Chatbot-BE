import { PrismaClient, Prisma } from "@prisma/client";
import csv from 'csv-parser';
import * as fs from 'fs';

const prisma = new PrismaClient();

interface CarRow {
    Id: string;
    carType: string;
    carMerk: string;
  }
interface CarListRow {
    carId: string;
    carYear: string;
    carPrice: string;
    carLoan: string;
    kmStart: string;
    kmEnd: string;
    carPhoto:string;
}
  
const seedCars = async (filePath: string) => {
    const carDatas: CarRow[] = [];
    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: CarRow) => carDatas.push(data))
        .on('end', async () => {
            const jsonCarDatas: any = carDatas.map(car => ({
                id: car.Id,
                carType: car.carType,
                carMerk: car.carMerk,
            }));
            try {
                const createdCars = await prisma.car.createMany({ data: jsonCarDatas,skipDuplicates: true, });
                console.log(`Seeded ${createdCars.count} cars`);
                resolve();
            } catch (e) {
                console.error(e);
                reject(e);
            }
        })
        .on('error', reject);
    });
};

const seedCarLists = async (filePath: string) => {
    const carListDatas: CarListRow[] = [];
    return new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: CarListRow) => carListDatas.push(data))
        .on('end', async () => {
            const jsonCarListDatas: any = carListDatas.map(car => {
                let newCarPrice = car.carPrice.split("Rp")[1].split(".")[0].replace(/,/g, '');
                return {
                    carId: car.carId,
                    carYear: parseInt(car.carYear),
                    carPrice: parseInt(newCarPrice),
                    carLoan: parseInt(car.carLoan),
                    kmStart: parseInt(car.kmStart),
                    kmEnd: parseInt(car.kmEnd),
                    carPhoto: car.carPhoto
                }
            });
            console.log(jsonCarListDatas)
            try {
                const createdCarList = await prisma.carList.createMany({ data: jsonCarListDatas,skipDuplicates: true, });
                console.log(`Seeded ${createdCarList.count} car lists`);
                resolve();
            } catch (e) {
                console.error(e);
                reject(e);
            }
        })
        .on('error', reject);
    });
};

try {
    console.log("main")
    await seedCars('public/carDB.csv');
    await seedCarLists('public/carListDB.csv');
} catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
}