import { promises as fsPromises } from "fs";
import { db } from "../database/database_mysql80.js";
import { log } from "console";

export const getPizzas = async () => {
  const sql = `select pid, menuimg, lable, pname, concat(format(lprice,0),'원') as lprice, concat(format(mprice,0),'원') as mprice, desc1, desc2, mcategory, country, topping from pizza
  `;

  return await db.execute(sql).then((result) => result[0]);
};

export const getPizzasDetail = async (id) => {
  const sql = `select pid, menuimg, pname, concat(format(lprice,0),'원') as lprice, concat(format(mprice,0),'원') as mprice, desc1, desc2, category, pcode, ptype, did, ecategory, ecode, etype, country, topping, mcategory from pizza
where pid = ?`;

  return await db.execute(sql, [id]).then((result) => result[0][0]);
};

export const getPizzasDough = async (id) => {
  const sql = `select pid, dprice, dname from pizza p, dough_option d
    WHERE p.category = d.category
    AND p.pcode = d.pcode
    AND p.ptype = d.ptype
    AND p.pid = ?`;

  return db.execute(sql, [id]).then((result) => result[0]);
};

export const getPizzasEdge = async (id) => {
  let sql = "";
  if (id > 100) {
    sql = `select DISTINCT eid,ename,eprice from pizza p, edge_option e
        WHERe p.etype = e.etype
        AND e.etype > 100 
        AND NOT e.etype=100
        order by eid`;
    return await db.execute(sql, [id]).then((result) => result[0]);
  } else {
    sql = `select DISTINCT ename from pizza p, edge_option e
        WHERe p.etype = e.etype
        AND e.etype = 100; `;
    return await db.execute(sql, [id]).then((result) => result[0]);
  }
};

export const getPizzasTopping = async (topping) => {
  const sql = `SELECT tid,tname,timage,tkind,tprice,quantity from topping
  where tkind = ?`;

  return await db.execute(sql, [topping]).then((result) => result[0]);
};

export const getSides = async () => {
  const sql = `select sid, sname, simage, skind, concat(format(sprice,0),'원') as sprice, lable, desc1, country, topping, quantity, category from side`;

  return await db.execute(sql).then((result) => result[0]);
};

export const getSidesDetail = async (id) => {
  const sql = `select sid, sname, simage, skind, format(sprice,0) as sprice, lable, desc1, country, topping, quantity, category from side
                where sid = ?`;

  return db.execute(sql, [id]).then((result) => result[0][0]);
};

export const getPopular = async () => {
  const sql = `select id, name, text, image1, image2 from combomeal`;

  return db.execute(sql).then((result) => result[0][0]);
};

export const getPizza = async (halfChoice) => {
  const sql = `select pid as id, halfimg as img, lable, pname, lprice, mprice, category, ptype,pcode, did, ecategory, ecode, etype from pizza
 where ptype between 200 AND 500
 AND pcode between 20 AND 50
 AND NOT pid = 6 AND NOT pname= '블록버스터4' AND NOT pname= '베스트 콰트로'
 AND NOT ptype = 300  `;

  return db.execute(sql, [halfChoice]).then((result) => result[0]);

  /*  const path = 'data/halfPizza.json'
    const event = fsPromises.readFile(path, "utf-8").then(data =>  {
        return JSON.parse(data)
    })
    .catch(error=> console.log(error))
    return event;*/
};

export const getLeftPizza = async (id) => {
  const sql = `select pid as id, halfimg as img, lable, pname, lprice, mprice, category,pcode ptype, did, ecategory, ecode, etype from pizza
    where pid = ?
`;

  return db.execute(sql, [id]).then((result) => result[0][0]);

  /*  const path = 'data/halfPizza.json'
   const event = fsPromises.readFile(path, "utf-8").then(data =>  {
       return JSON.parse(data)
   })
   .catch(error=> console.log(error))
   return event;*/
};

export const getRightPizza = async (id, type) => {
  const sql = `select pid as id, halfimg as img, lable, pname, lprice, mprice, category,pcode ptype, did, ecategory, ecode, etype from pizza
    where pid = ?
    AND pcode = ?
`;

  return db.execute(sql, [id, type]).then((result) => result[0][0]);
};

export const getDoughPizza = async (id) => {
  const sql = `select pid as id, dprice, dname from pizza p, dough_option d
    WHERE p.category = d.category
    AND p.pcode = d.pcode
    AND p.ptype = d.ptype
    AND p.pid = ?`;

  return await db.execute(sql, [id]).then((result) => result[0]);

  /*  let sql = '';
    if(id > 100){
        sql = `select DISTINCT eid,ename,eprice from pizza p, edge_option e
        WHERe p.etype = e.etype
        AND e.etype > 100 
        AND NOT e.etype=100
        order by eid`
    }else{
        sql = `select DISTINCT ename from pizza p, edge_option e
        WHERe p.etype = e.etype
        AND e.etype = 100; `
    }

     
    return await db.execute(sql, [id])
       .then(result =>  result[0])  */
};

export const getEdgePizza = async (id) => {
  let sql = "";
  if (id > 100) {
    sql = `select DISTINCT eid,ename,eprice from pizza p, edge_option e
        WHERe p.etype = e.etype
        AND e.etype > 100 
        AND NOT e.etype=100
        order by eid`;
    return await db.execute(sql, [id]).then((result) => result[0]);
  } else {
    sql = `select DISTINCT ename from pizza p, edge_option e
        WHERe p.etype = e.etype
        AND e.etype = 100; `;
    return await db.execute(sql, [id]).then((result) => result[0]);
  }
};

export const getTopping = async (topping) => {
  console.log("[topping]===>", topping);

  const sql = `SELECT tid,tname,timage,tkind,tprice,quantity from topping
        where tkind = ?`;

  return await db.execute(sql, [topping]).then((result) => result[0]);
};

export const getSecondChoice = async (id) => {
  const sql = `select pid as id, halfimg as img, pname, lprice, mprice, category, ptype,pcode, did, ecategory, ecode, etype from pizza
        where category  = ?
        AND NOT pid = 6 AND NOT pname= '블록버스터4' AND NOT pname= '베스트 콰트로'
        AND NOT pid BETWEEN 1 AND 4
        AND NOT ptype = 300  `;

  return await db.execute(sql, [id]).then((result) => result[0]);
};

export const getSide = async (side) => {
  const sql = ` select sid,sname,simage,skind,sprice,quantity from side`;
  return await db.execute(sql, [side]).then((result) => result[0]);
};
