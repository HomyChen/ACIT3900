DROP DATABASE IF EXISTS sot;
create database SOT;
\connect sot;
CREATE TABLE Parts (
    Part_ID SERIAL PRIMARY KEY,
    Part_No VARCHAR(20),
    Part_Desc TEXT,
    Qty SMALLINT,
    Unit_Price FLOAT,
    SELL_PRICE FLOAT
);


CREATE TABLE Task(
    Task_ID SERIAL PRIMARY KEY,
    Task_Name VARCHAR(30),
    Task_Desc TEXT
);

CREATE TABLE Customer(
    Cust_ID SERIAL PRIMARY KEY,
    First_Name VARCHAR(50),
    Last_Name  VARCHAR(50),
    Home_Phone VARCHAR(20),
    Cell_Phone VARCHAR(20),
    Street VARCHAR(100),
    City VARCHAR(50),
    Postal_Code VARCHAR(6),
    Date_Added Date
);

ALTER TABLE Customer ALTER COLUMN Last_Name  SET NOT NULL;

CREATE TABLE Vehicle(
    Vehicle_ID SERIAL PRIMARY KEY,
    VIN VARCHAR(17),
    Year SMALLINT,
    License VARCHAR(15),
    Make VARCHAR(20),
    Model VARCHAR(20),
    Body VARCHAR(20),
    Style VARCHAR(40),
    Color VARCHAR(20),
    Date_Added Date
);

ALTER TABLE Vehicle
    ADD COLUMN Cust_ID Integer;

    ALTER TABLE Vehicle
    ADD CONSTRAINT FK_CUST_ID
    FOREIGN KEY (Cust_ID) REFERENCES Customer (Cust_ID);


CREATE TABLE Repair_Order(
    RO_ID SERIAL PRIMARY KEY,
    Vehicle_Notes VARCHAR(255),
    Odometer_In FLOAT,
    Odometer_Out FLOAT,
    Promised_Time DATE,
    Date_In DATE,
    Date_Out DATE,
    Status VARCHAR(20)
);

ALTER TABLE Repair_Order
    ADD COLUMN Vehicle_ID Integer;


ALTER TABLE Repair_Order
    ADD CONSTRAINT FK_Vehicle_ID
    FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle (Vehicle_ID);

CREATE TABLE Work_Task(
    WorkTask_ID SERIAL PRIMARY KEY,
    Comments TEXT,
    Labor_HRS FLOAT,
    Labor_rate FLOAT
);

ALTER TABLE Work_Task
    ADD COLUMN RO_ID Integer;

ALTER TABLE Work_Task
    ADD COLUMN Task_ID Integer;

ALTER TABLE Work_Task
    ADD CONSTRAINT FK_RO_ID
    FOREIGN KEY (RO_ID) REFERENCES Repair_Order (RO_ID);

ALTER TABLE Work_Task
    ADD CONSTRAINT FK_Task_ID_ID
    FOREIGN KEY (Task_ID) REFERENCES Task (Task_ID);


ALTER TABLE Parts
    ADD COLUMN WorkTask_ID Integer;

ALTER TABLE Parts
       ADD CONSTRAINT FK_WorkTask_ID
       FOREIGN KEY (WorkTask_ID) REFERENCES Work_Task (WorkTask_ID);

