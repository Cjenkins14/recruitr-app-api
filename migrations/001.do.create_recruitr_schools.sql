DROP TABLE IF EXISTS schools;


CREATE TABLE schools (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    schoolname TEXT NOT NULL
);

INSERT INTO schools (schoolname)
values 
('DHS'),
('RHS'),
('GHS');
