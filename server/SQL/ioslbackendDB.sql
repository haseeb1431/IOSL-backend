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
