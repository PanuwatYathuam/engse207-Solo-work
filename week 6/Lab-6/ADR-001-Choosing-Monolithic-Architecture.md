# ADR-001: Selection of Monolithic Architecture for Meeting Room Booking System

Date: 2026-01-10
Status: Accepted
Deciders: [ภาณุวัฒน์ ยาท้วม]


## Context

### Problem Statement
บริษัทต้องการพัฒนาระบบจองห้องประชุมออนไลน์ที่มีประสิทธิภาพ เพื่อแก้ปัญหาการจองซ้ำซ้อนและความไม่สะดวกในการตรวจสอบห้องว่าง โดยระบบต้องรองรับฟีเจอร์ Real-time availability และการแจ้งเตือน

### Key Drivers & Constraints
- Time: ต้องพัฒนาให้เสร็จภายใน 3 เดือน (Critical)
- Team: ทีมพัฒนาขนาดเล็ก (5 คน)
- Budget: งบประมาณจำกัดไม่เกิน 500,000 บาท
- Quality: ระบบต้องมีความเสถียร (Availability 99.9%) และตอบสนองไว


## Decision

เราตัดสินใจเลือกใช้ **Monolithic Architecture** สำหรับการพัฒนาระบบจองห้องประชุมในเฟสแรก

### Architecture Description
ระบบจะถูกออกแบบเป็น Single Deployable Unit โดยรวม Modules ทั้งหมด (User Management, Booking Logic, Notification) ไว้ใน Application เดียวที่เชื่อมต่อกับฐานข้อมูล PostgreSQL เพียงหนึ่งฐานข้อมูล

### Technologies
- Frontend: React.js
- Backend: Node.js (Express)
- Database: PostgreSQL
- Infrastructure: Docker on Single Cloud Instance


## Rationale (เหตุผลสนับสนุน)

1. Alignment with Constraints: ปัจจัยสำคัญที่สุดคือ "เวลา" และ "คน" สถาปัตยกรรม Monolith มีความซับซ้อนต่ำ ทำให้ทีม 5 คนสามารถเริ่มงานได้ทันทีและส่งมอบระบบ MVP ได้ภายใน 3 เดือนตามกำหนด
2. Simplicity: การมี Database เดียวทำให้การจัดการ Transaction (เช่น การป้องกันการจองห้องซ้ำ) ทำได้ง่ายและแม่นยำ (ACID Compliance) โดยไม่ต้องใช้เทคนิคซับซ้อนแบบ Distributed Transaction
3. Cost Efficiency: ประหยัดค่าใช้จ่ายด้าน Server และ Maintenance เมื่อเทียบกับ Microservices ที่ต้องดูแลหลายเครื่อง


## Consequences (ผลกระทบ)

### Positive
- ทีมงานสามารถโฟกัสที่ Business Logic ได้เต็มที่ ไม่ต้องเสียเวลากับ Infrastructure
- การทดสอบ (Testing) และ Debug ทำได้ง่าย รวดเร็ว
- ประหยัดงบประมาณโครงการ

### Negative & Mitigation
- Scalability Limit: หากผู้ใช้เพิ่มขึ้นมาก จะขยายระบบได้ยาก
  - Mitigation: ออกแบบ Code ให้เป็น Modular (Modular Monolith) เพื่อให้แยก Service ได้ง่ายในอนาคตถ้าจำเป็น
- Single Point of Failure: ถ้า Server ล่ม ระบบจะใช้งานไม่ได้ทั้งหมด
  - Mitigation: ใช้บริการ Cloud ที่มี Auto-recovery และทำ Database Replication สำรองข้อมูลสม่ำเสมอ