CREATE DATABASE "ioslbackendDB"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;



go;

CREATE TABLE public."Person"
(
    "ID" serial NOT NULL,
    "FullName" character varying(100) NOT NULL,
    "Email" character varying(100) NOT NULL,
    "Password" character varying(250) NOT NULL,
    "DateOfBirth" date,
    "PersonType" integer DEFAULT 0,
    "PersonRole" integer DEFAULT 0,
    "PicturePath" character varying(250),
    PRIMARY KEY ("ID")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."Person"
    OWNER to postgres;



CREATE TABLE public."Address"
(
    "AddressID" serial NOT NULL,
    "StreetAddress" character varying(150),
    "City" character varying(150),
    "Country" character varying(50),
    "PostCode" integer,
    PRIMARY KEY ("AddressID")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."Address"
    OWNER to postgres;    


CREATE TABLE public."Orders"
(
    "OrderID" serial NOT NULL,
    "PickAddressID" integer NOT NULL,
    "DropAddressID" integer NOT NULL,
    "PickDate" date,
    "ArrivalDate" date,
    PRIMARY KEY ("OrderID")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."Orders"
    OWNER to postgres;    

ALTER TABLE public."Orders"
    ADD COLUMN "PersonID" integer;    
    
ALTER TABLE public."Orders"
    ADD COLUMN "ReceiverPersonID" integer; 

ALTER TABLE public."Orders"
    ADD COLUMN "Status" character varying(50);    

CREATE TABLE public."Incident"
(
    "IncidentId" serial NOT NULL,
    "Description" character varying(5000),
    "OrderId" integer,
    "PersonId" integer,
    PRIMARY KEY ("IncidentId")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."Incident"
    OWNER to ioslpg;    


-- Login related columns
ALTER TABLE public."Person"
    ADD COLUMN "googleProviderId" character varying(50);  

ALTER TABLE public."Person"
    ADD COLUMN "googleAccessToken" character varying(500);  

CREATE TABLE public."Sensor"
(
    "Id" serial NOT NULL,
    "Name" character varying(100) NOT NULL,
    "Description" character varying(1000),
    "MinValue" character varying(25),
    "MaxValue" character varying(25),
    "DisplayUnit" character varying(50),
    PRIMARY KEY ("Id")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."Sensor"
    OWNER to ioslpg;

CREATE TABLE public."OrderSensors"
(
    "Id" serial,
    "OrderId" integer NOT NULL,
    "SensorId" integer NOT NULL,
    "MinThreshold" integer,
    "MaxThreshold" integer,
    valuerecorded character varying(25),
    PRIMARY KEY ("Id")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."OrderSensors"
    OWNER to ioslpg;
COMMENT ON TABLE public."OrderSensors"
    IS 'Store the sensors for a specific Order';
