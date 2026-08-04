TRUNCATE TABLE notifications, broadcasts, reports, messages, chat_rooms, swipe_records, activity_participants, activities, user_sport_preferences, user_preferences, user_devices, refresh_tokens, users CASCADE;

INSERT INTO users (id, email, "passwordHash", full_name, avatar_url, bio, google_id, is_active, role) VALUES
('u1','andi@example.com','$2b$10$dGzYbX0Qq5Qq5Qq5Qq5QqOeWfX0Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq','Andi Pratama','https://i.pravatar.cc/150?u=andi','Futsal enthusiast',NULL,true,'USER'),
('u2','budi@example.com','$2b$10$dGzYbX0Qq5Qq5Qq5Qq5QqOeWfX0Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq','Budi Santoso','https://i.pravatar.cc/150?u=budi','Badminton player',NULL,true,'USER'),
('u3','citra@example.com','$2b$10$dGzYbX0Qq5Qq5Qq5Qq5QqOeWfX0Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq','Citra Dewi','https://i.pravatar.cc/150?u=citra','Yoga instructor',NULL,true,'USER'),
('u4','doni@example.com','$2b$10$dGzYbX0Qq5Qq5Qq5Qq5QqOeWfX0Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq','Doni Hermawan','https://i.pravatar.cc/150?u=doni','Runner & cyclist',NULL,true,'USER'),
('u5','eka@example.com','$2b$10$dGzYbX0Qq5Qq5Qq5Qq5QqOeWfX0Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq','Eka Rahayu','https://i.pravatar.cc/150?u=eka','Volleyball & swimming',NULL,true,'USER'),
('u6','fajar@example.com','$2b$10$dGzYbX0Qq5Qq5Qq5Qq5QqOeWfX0Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq','Fajar Nugroho','https://i.pravatar.cc/150?u=fajar','Gym rat',NULL,true,'USER'),
('u7','gita@example.com','$2b$10$dGzYbX0Qq5Qq5Qq5Qq5QqOeWfX0Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq','Gita Permata','https://i.pravatar.cc/150?u=gita','Martial arts',NULL,true,'USER'),
('u_admin','admin@matchup.id','$2b$10$dGzYbX0Qq5Qq5Qq5Qq5QqOeWfX0Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq5Qq','Admin MatchUp','https://i.pravatar.cc/150?u=admin','System administrator',NULL,true,'ADMIN');

INSERT INTO user_preferences (id, user_id, max_distance_km, age_range_min, age_range_max, notifications_on) VALUES
('up1','u1',15,18,40,true),('up2','u2',10,20,35,true),('up3','u3',25,18,45,true),('up4','u4',30,18,50,true),
('up5','u5',20,18,40,true),('up6','u6',10,20,35,false),('up7','u7',15,18,40,true);

INSERT INTO user_sport_preferences (id, user_id, sport, skill_level) VALUES
('usp1','u1','FUTSAL','INTERMEDIATE'),('usp2','u1','FOOTBALL','INTERMEDIATE'),('usp3','u2','BADMINTON','ADVANCED'),
('usp4','u2','BASKETBALL','INTERMEDIATE'),('usp5','u3','YOGA','ADVANCED'),('usp6','u3','TENNIS','BEGINNER'),
('usp7','u4','RUNNING','COMPETITIVE'),('usp8','u4','CYCLING','INTERMEDIATE'),('usp9','u5','VOLLEYBALL','INTERMEDIATE'),
('usp10','u5','SWIMMING','BEGINNER'),('usp11','u6','GYM','ADVANCED'),('usp12','u6','BASKETBALL','INTERMEDIATE'),
('usp13','u7','MARTIAL_ARTS','INTERMEDIATE'),('usp14','u7','TABLE_TENNIS','BEGINNER');

INSERT INTO activities (id, host_id, title, description, sport, skill_level, location_name, latitude, longitude, scheduled_at, duration_minutes, max_participants, status, image_url) VALUES
('a1','u1','Futsal Weekend Fun','Santai futsal weekend','FUTSAL','INTERMEDIATE','Champion Futsal Kelapa Gading',-6.1555,106.9020,'2026-08-10 08:00:00+00',90,10,'OPEN','https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600'),
('a2','u2','Badminton Pagi GBK','Badminton pagi di GBK','BADMINTON','ADVANCED','Istora Senayan GBK',-6.2202,106.8020,'2026-08-11 06:00:00+00',120,4,'OPEN','https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600'),
('a3','u3','Yoga in the Park','Sunday morning yoga','YOGA','ADVANCED','Taman Suropati Menteng',-6.2010,106.8325,'2026-08-12 07:00:00+00',60,15,'OPEN','https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600'),
('a4','u4','Morning Run CFD','Lari pagi 5K di CFD','RUNNING','COMPETITIVE','Bundaran HI Jakarta',-6.1950,106.8230,'2026-08-13 06:00:00+00',45,20,'OPEN','https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600'),
('a5','u5','Voli Fun Match','Voli santai di Lapangan Banteng','VOLLEYBALL','INTERMEDIATE','Lapangan Banteng Jakarta',-6.1700,106.8350,'2026-08-14 16:00:00+00',90,12,'OPEN','https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600'),
('a6','u6','Basketball 3v3','Streetball 3v3','BASKETBALL','INTERMEDIATE','Lapangan Basket Senayan',-6.2240,106.7980,'2026-08-15 17:00:00+00',60,6,'FULL','https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600'),
('a7','u7','Table Tennis Meet','Tenis meja santai','TABLE_TENNIS','BEGINNER','GOR Pasar Minggu',-6.2630,106.8170,'2026-08-16 15:00:00+00',90,8,'OPEN','https://images.unsplash.com/photo-1611251135345-18c56206b863?w=600'),
('a8','u1','Futsal Malam','Futsal malem','FUTSAL','INTERMEDIATE','IFC Futsal Kemang',-6.2630,106.8120,'2026-08-17 20:00:00+00',90,10,'OPEN','https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600'),
('a9','u4','Gowes Bogor','Gowes Jakarta-Bogor','CYCLING','INTERMEDIATE','Gelora Bung Karno',-6.2180,106.8020,'2026-08-18 05:00:00+00',240,10,'OPEN','https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600'),
('a10','u3','Class Tenis Pemula','Belajar tenis bareng','TENNIS','BEGINNER','Lapangan Tenis GBK',-6.2205,106.8015,'2026-08-19 08:00:00+00',90,4,'OPEN','https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600');

INSERT INTO activity_participants (id, activity_id, user_id) VALUES
('ap1','a1','u1'),('ap2','a1','u4'),('ap3','a1','u5'),('ap4','a1','u7'),
('ap5','a2','u2'),('ap6','a2','u3'),('ap7','a2','u7'),
('ap8','a3','u3'),('ap9','a3','u5'),('ap10','a3','u1'),('ap11','a3','u2'),
('ap12','a6','u6'),('ap13','a6','u1'),('ap14','a6','u2'),('ap15','a6','u4'),('ap16','a6','u5'),('ap17','a6','u7'),
('ap18','a4','u4'),('ap19','a4','u1'),('ap20','a4','u6'),
('ap21','a5','u5'),('ap22','a5','u3'),('ap23','a5','u7');

INSERT INTO swipe_records (id, user_id, activity_id, direction) VALUES
('sr1','u1','a2','RIGHT'),('sr2','u1','a3','LEFT'),('sr3','u1','a4','RIGHT'),
('sr4','u2','a1','RIGHT'),('sr5','u2','a5','LEFT'),
('sr6','u3','a2','RIGHT'),('sr7','u3','a4','RIGHT'),
('sr8','u4','a1','RIGHT'),('sr9','u4','a6','LEFT'),
('sr10','u5','a1','RIGHT'),('sr11','u5','a7','RIGHT'),
('sr12','u6','a4','RIGHT'),('sr13','u6','a5','RIGHT'),
('sr14','u7','a1','RIGHT'),('sr15','u7','a2','RIGHT'),('sr16','u7','a3','LEFT');

INSERT INTO chat_rooms (id, activity_id) VALUES ('cr1','a1'),('cr2','a2'),('cr3','a6');

INSERT INTO messages (id, chat_room_id, sender_id, content) VALUES
('msg1','cr1','u1','Halo semua! Siapa yang datang hari Minggu?'),
('msg2','cr1','u4','Gue dateng bang! Bawa temen boleh?'),
('msg3','cr1','u1','Boleh dong, makin rame makin seru!'),
('msg4','cr1','u5','Aku juga ikut ya. Jam 8 ya?'),
('msg5','cr1','u1','Iya jam 8. Jangan telat!'),
('msg6','cr2','u2','Morning! Siapa yang udah di GBK?'),
('msg7','cr2','u3','OtW, 10 menit lagi sampe'),
('msg8','cr2','u7','Aku udah di sini. Lapangan 3 ya?'),
('msg9','cr3','u6','3v3 besok jadi kan? Full team!'),
('msg10','cr3','u2','Jadi! Gue bawa bola'),
('msg11','cr3','u1','Sip. Sampe ketemu!');

INSERT INTO reports (id, reporter_id, reported_user_id, activity_id, reason, description) VALUES
('r1','u4','u6','a6','INAPPROPRIATE_BEHAVIOR','User ini berkata-kata kasar di chat');

INSERT INTO broadcasts (id, author_id, title, body, target_all) VALUES
('b1','u_admin','Welcome to MatchUp!','Selamat datang di MatchUp! Temukan aktivitas olahraga di sekitarmu, swipe, dan main bareng!',true),
('b2','u_admin','Update: Fitur Chat','Fitur chat sekarang tersedia di setiap activity yang kamu join.',true),
('b3','u_admin','Tips Keamanan','Selalu bertemu di tempat umum. Laporkan perilaku mencurigakan.',true);

INSERT INTO notifications (id, user_id, type, title, body, data, is_read) VALUES
('n1','u4','ACTIVITY_MATCHED','Activity Matched!','Kamu match dengan Futsal Weekend Fun!','{"activityId":"a1"}',true),
('n2','u1','NEW_PARTICIPANT','New Participant','Doni Hermawan joined Futsal Weekend Fun','{"activityId":"a1"}',true),
('n3','u1','NEW_PARTICIPANT','New Participant','Eka Rahayu joined Futsal Weekend Fun','{"activityId":"a1"}',true),
('n4','u3','ACTIVITY_MATCHED','Activity Matched!','Kamu match dengan Badminton Pagi GBK','{"activityId":"a2"}',true),
('n5','u1','CHAT_MESSAGE','New message in Futsal','Doni: Gue dateng bang!','{"chatRoomId":"cr1"}',true),
('n6','u1','ACTIVITY_REMINDER','Reminder: Futsal Besok!','Futsal Weekend Fun besok jam 08:00','{"activityId":"a1"}',false),
('n7','u3','ACTIVITY_REMINDER','Reminder: Badminton Besok','Badminton Pagi besok jam 06:00','{"activityId":"a2"}',false),
('n8','u1','BROADCAST','Tips Keamanan','Selalu bertemu di tempat umum...','{"broadcastId":"b3"}',false);
