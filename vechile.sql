DROP DATABASE IF EXISTS sot;
create database SOT;

\c sot;

CREATE TABLE Parts (
    Part_ID SERIAL PRIMARY KEY,
    Part_No VARCHAR(20) default NULL,
    Part_Desc TEXT default NULL,
    Qty SMALLINT default NULL,
    Unit_Price FLOAT default NULL,
    SELL_PRICE FLOAT default NULL
);
CREATE TABLE Task(
    Task_ID SERIAL PRIMARY KEY,
    Task_Name TEXT,
    Task_Desc TEXT default NULL
);
CREATE TABLE Customer(
    Cust_ID SERIAL PRIMARY KEY,
    First_Name VARCHAR(50),
    Last_Name  VARCHAR(50),
    Home_Phone VARCHAR(20) default NULL,
    Cell_Phone VARCHAR(20) default NULL,
    Street VARCHAR(100) default NULL,
    City VARCHAR(50) default NULL,
    Postal_Code VARCHAR(7) default NULL,
    Date_Added Date
);
ALTER TABLE Customer ALTER COLUMN Last_Name  SET NOT NULL;
CREATE TABLE Vehicle(
    Vehicle_ID SERIAL PRIMARY KEY,
    VIN VARCHAR(17) default NULL,
    Year VARCHAR(4) default NULL,
    license_plate VARCHAR(15) default NULL,
    Make VARCHAR(20) default NULL,
    Model VARCHAR(20) default NULL,
    Body VARCHAR(20) default NULL,
    Style VARCHAR(40) default NULL,
    Color VARCHAR(20) default NULL,
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
    Odometer_In FLOAT default NULL,
    Odometer_Out FLOAT,
    Promised_Time DATE default NULL,
    Date_In DATE,
    Date_Out DATE,
    Status TEXT DEFAULT FALSE
);
ALTER TABLE Repair_Order
    ADD COLUMN Vehicle_ID Integer;
ALTER TABLE Repair_Order
    ADD CONSTRAINT FK_Vehicle_ID
    FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle (Vehicle_ID);
CREATE TABLE Repair_Tasks(
    WorkTask_ID SERIAL PRIMARY KEY ,
    Comments TEXT,
    Labor_HRS FLOAT,
    Labor_rate FLOAT
);
ALTER TABLE Repair_Tasks
    ADD COLUMN RO_ID Integer;
ALTER TABLE Repair_Tasks
    ADD COLUMN Task_ID Integer;
ALTER TABLE Repair_Tasks
    ADD CONSTRAINT FK_RO_ID
    FOREIGN KEY (RO_ID) REFERENCES Repair_Order (RO_ID);
ALTER TABLE Repair_Tasks
    ADD CONSTRAINT FK_Task_ID_ID
    FOREIGN KEY (Task_ID) REFERENCES Task (Task_ID);
ALTER TABLE Parts
    ADD COLUMN WorkTask_ID Integer;
ALTER TABLE Parts
       ADD CONSTRAINT FK_WorkTask_ID
       FOREIGN KEY (WorkTask_ID) REFERENCES repair_tasks (WorkTask_ID);

INSERT INTO task (task_name) VALUES
    ('Complete vehicle inspection with report'),
    ('Oil change and complete vehicle inspection'),
    ('Diagnose for noise while driving') ,
    ('Check engine light diagnosis'),
    ('Tire rotation'),
    ('Mount and balance 4 tires'),
    ('Instructor approval after repairs'),
    ('Air Conditioning Service'),
    ('Replace Cabin Air Filter');