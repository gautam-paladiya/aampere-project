import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738892364859 implements MigrationInterface {
    name = 'Migration1738892364859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying NOT NULL, "model" character varying NOT NULL, "year" integer NOT NULL, "price" numeric NOT NULL, "range_km" numeric NOT NULL, "color" character varying NOT NULL, "condition" character varying NOT NULL, "battery_capacity_kWh" numeric NOT NULL, "charging_speed_kW" numeric NOT NULL, "seats" integer NOT NULL, "drivetrain" character varying NOT NULL, "location" character varying NOT NULL, "autopilot" boolean NOT NULL DEFAULT false, "kilometer_count" integer NOT NULL, "accidents" boolean NOT NULL DEFAULT false, "accidents_description" character varying, "images" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying, "updated_on" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
    }

}
