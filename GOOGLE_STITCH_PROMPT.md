# Prompt Google Stitch - JasaKu (ULTRA DETAILED UI SPECIFICATION)

Gunakan prompt ini untuk membuat UI aplikasi JasaKu di Google Stitch dengan spesifikasi yang sangat detail.

```text
Buatkan desain UI aplikasi web bernama JasaKu dengan spesifikasi UI yang sangat detail berikut ini.

==================================================
⚠️ PERINGATAN PENTING - WAJIB DIBACA
==================================================

UI HARUS 1000% MENGIKUTI SPESIFIKASI INI. TIDAK BOLEH ADA PERUBAHAN APAPUN.

JANGAN:
❌ Membuat konsep desain baru
❌ Redesign atau modernisasi tampilan
❌ Mengubah warna yang sudah ditentukan
❌ Mengurangi atau menghilangkan menu
❌ Mengganti struktur halaman
❌ Membuat tampilan berbeda dari spesifikasi
❌ Membuat landing page marketing yang berbeda
❌ Mengganti tabel menjadi card jika spesifikasi tabel
❌ Membuat desain minimalis hingga fitur hilang
❌ Membuat UI hanya sebagian halaman
❌ Menggunakan alert browser polos (harus modal custom)
❌ Menggunakan input file default polos (harus styled)

HARUS:
✅ Ikuti SEMUA spesifikasi warna hex yang diberikan
✅ Ikuti SEMUA ukuran font yang diberikan
✅ Ikuti SEMUA spacing dan padding yang diberikan
✅ Ikuti SEMUA ukuran komponen yang diberikan
✅ Buat SEMUA menu yang disebutkan
✅ Buat SEMUA halaman yang disebutkan
✅ Gunakan modal custom untuk konfirmasi
✅ Gunakan input file styled untuk upload
✅ Pastikan semua teks terlihat utuh (tidak terpotong)
✅ Buat layout responsive desktop dan mobile

==================================================
🎨 DESIGN SYSTEM - WARNA
==================================================

PRIMARY COLORS:
- Primary Blue: #3B82F6 (rgb(59, 130, 246))
- Primary Purple: #8B5CF6 (rgb(139, 92, 246))
- Primary Dark Blue: #2563EB (rgb(37, 99, 235))
- Primary Light Blue: #60A5FA (rgb(96, 165, 250))

SECONDARY COLORS:
- Success Green: #10B981 (rgb(16, 185, 129))
- Success Light: #D1FAE5 (rgb(209, 250, 229))
- Warning Yellow: #F59E0B (rgb(245, 158, 11))
- Warning Light: #FEF3C7 (rgb(254, 243, 199))
- Danger Red: #EF4444 (rgb(239, 68, 68))
- Danger Light: #FEE2E2 (rgb(254, 226, 226))
- Info Cyan: #06B6D4 (rgb(6, 182, 212))

NEUTRAL COLORS:
- White: #FFFFFF (rgb(255, 255, 255))
- Gray 50: #F9FAFB (rgb(249, 250, 251))
- Gray 100: #F3F4F6 (rgb(243, 244, 246))
- Gray 200: #E5E7EB (rgb(229, 231, 235))
- Gray 300: #D1D5DB (rgb(209, 213, 219))
- Gray 400: #9CA3AF (rgb(156, 163, 175))
- Gray 500: #6B7280 (rgb(107, 114, 128))
- Gray 600: #4B5563 (rgb(75, 85, 99))
- Gray 700: #374151 (rgb(55, 65, 81))
- Gray 800: #1F2937 (rgb(31, 41, 55))
- Gray 900: #111827 (rgb(17, 24, 39))
- Black: #000000 (rgb(0, 0, 0))

GRADIENT COLORS:
- Gradient Blue to Purple: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Gradient Light Blue to Purple: linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)
- Gradient Dark: linear-gradient(135deg, #1F2937 0%, #111827 100%)

STATUS BADGE COLORS:
- Pending: Background #FEF3C7, Text #92400E, Border #FDE68A
- Confirmed: Background #D1FAE5, Text #065F46, Border #A7F3D0
- In Progress: Background #DBEAFE, Text #1E40AF, Border #BFDBFE
- Completed: Background #E9D5FF, Text #6B21A8, Border #DDD6FE
- Cancelled: Background #FEE2E2, Text #991B1B, Border #FECACA
- Active: Background #D1FAE5, Text #065F46, Border #A7F3D0
- Inactive: Background #F3F4F6, Text #4B5563, Border #E5E7EB

==================================================
📝 DESIGN SYSTEM - TYPOGRAPHY
==================================================

FONT FAMILY:
- Primary: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif
- Monospace: 'Courier New', Courier, monospace

FONT SIZES:
- xs: 12px (0.75rem) - line-height: 16px
- sm: 14px (0.875rem) - line-height: 20px
- base: 16px (1rem) - line-height: 24px
- lg: 18px (1.125rem) - line-height: 28px
- xl: 20px (1.25rem) - line-height: 28px
- 2xl: 24px (1.5rem) - line-height: 32px
- 3xl: 30px (1.875rem) - line-height: 36px
- 4xl: 36px (2.25rem) - line-height: 40px
- 5xl: 48px (3rem) - line-height: 1
- 6xl: 60px (3.75rem) - line-height: 1
- 7xl: 72px (4.5rem) - line-height: 1

FONT WEIGHTS:
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800


==================================================
📐 DESIGN SYSTEM - SPACING & SIZING
==================================================

SPACING SCALE (padding, margin, gap):
- 0: 0px
- 1: 4px (0.25rem)
- 2: 8px (0.5rem)
- 3: 12px (0.75rem)
- 4: 16px (1rem)
- 5: 20px (1.25rem)
- 6: 24px (1.5rem)
- 8: 32px (2rem)
- 10: 40px (2.5rem)
- 12: 48px (3rem)
- 16: 64px (4rem)
- 20: 80px (5rem)
- 24: 96px (6rem)

BORDER RADIUS:
- none: 0px
- sm: 4px (0.25rem)
- base: 6px (0.375rem)
- md: 8px (0.5rem)
- lg: 12px (0.75rem)
- xl: 16px (1rem)
- 2xl: 24px (1.5rem)
- full: 9999px (circle/pill)

BORDER WIDTH:
- 0: 0px
- 1: 1px
- 2: 2px
- 4: 4px

SHADOWS:
- sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
- md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
- lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
- xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
- 2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)

CONTAINER MAX WIDTH:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

==================================================
🔘 DESIGN SYSTEM - BUTTONS
==================================================

PRIMARY BUTTON:
- Background: #3B82F6
- Text Color: #FFFFFF
- Font Size: 14px (sm) atau 16px (base)
- Font Weight: 600 (semibold)
- Padding: 10px 20px (vertical 10px, horizontal 20px)
- Border Radius: 8px (md)
- Border: none
- Shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- Hover Background: #2563EB
- Hover Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Active Background: #1D4ED8
- Transition: all 0.2s ease
- Icon Spacing: 8px dari teks

SECONDARY BUTTON:
- Background: #FFFFFF
- Text Color: #3B82F6
- Font Size: 14px (sm) atau 16px (base)
- Font Weight: 600 (semibold)
- Padding: 10px 20px
- Border Radius: 8px (md)
- Border: 1px solid #E5E7EB
- Shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- Hover Background: #F9FAFB
- Hover Border: #D1D5DB
- Active Background: #F3F4F6

SUCCESS BUTTON:
- Background: #10B981
- Text Color: #FFFFFF
- Font Size: 14px atau 16px
- Font Weight: 600
- Padding: 10px 20px
- Border Radius: 8px
- Hover Background: #059669

DANGER BUTTON:
- Background: #EF4444
- Text Color: #FFFFFF
- Font Size: 14px atau 16px
- Font Weight: 600
- Padding: 10px 20px
- Border Radius: 8px
- Hover Background: #DC2626

WARNING BUTTON:
- Background: #F59E0B
- Text Color: #FFFFFF
- Font Size: 14px atau 16px
- Font Weight: 600
- Padding: 10px 20px
- Border Radius: 8px
- Hover Background: #D97706

ICON BUTTON (untuk aksi tabel):
- Width: 36px
- Height: 36px
- Border Radius: 6px
- Background: transparent
- Hover Background: #F3F4F6
- Icon Size: 16px
- Icon Color: #6B7280
- Hover Icon Color: #3B82F6 (untuk view/edit), #EF4444 (untuk delete)


==================================================
📋 DESIGN SYSTEM - FORM INPUTS
==================================================

TEXT INPUT / TEXTAREA:
- Width: 100% (full width dalam container)
- Height: 42px (untuk input), auto (untuk textarea)
- Background: #FFFFFF
- Border: 1px solid #D1D5DB
- Border Radius: 8px
- Padding: 10px 14px
- Font Size: 14px
- Font Weight: 400
- Text Color: #111827
- Placeholder Color: #9CA3AF
- Focus Border Color: #3B82F6
- Focus Ring: 0 0 0 3px rgba(59, 130, 246, 0.1)
- Disabled Background: #F3F4F6
- Disabled Text Color: #9CA3AF

SELECT DROPDOWN:
- Width: 100%
- Height: 42px
- Background: #FFFFFF
- Border: 1px solid #D1D5DB
- Border Radius: 8px
- Padding: 10px 14px
- Font Size: 14px
- Font Weight: 400
- Text Color: #111827
- Arrow Icon: chevron-down, color #6B7280
- Focus Border Color: #3B82F6
- Focus Ring: 0 0 0 3px rgba(59, 130, 246, 0.1)

FILE INPUT (STYLED):
- Container Background: #FFFFFF
- Container Border: 1px dashed #D1D5DB
- Container Border Radius: 8px
- Container Padding: 24px
- Button Background: #3B82F6
- Button Text: "Pilih File" atau "Choose File"
- Button Text Color: #FFFFFF
- Button Padding: 8px 16px
- Button Border Radius: 6px
- Button Font Size: 14px
- Button Font Weight: 600
- File Name Text Color: #6B7280
- File Name Font Size: 14px
- Icon Upload: cloud-upload atau upload, size 24px, color #9CA3AF
- Hover Container Border: #3B82F6

LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #374151
- Margin Bottom: 6px
- Display: block

FORM GROUP SPACING:
- Margin Bottom: 20px (antar form group)

ERROR MESSAGE:
- Font Size: 12px
- Font Weight: 400
- Text Color: #EF4444
- Margin Top: 4px
- Icon: exclamation-circle, size 12px

SUCCESS MESSAGE:
- Font Size: 12px
- Font Weight: 400
- Text Color: #10B981
- Margin Top: 4px
- Icon: check-circle, size 12px

==================================================
🏷️ DESIGN SYSTEM - BADGES
==================================================

BADGE PILL (untuk status):
- Display: inline-flex
- Align Items: center
- Padding: 4px 12px
- Border Radius: 9999px (full/pill)
- Font Size: 12px
- Font Weight: 600
- Text Transform: capitalize
- Border: 1px solid

BADGE PENDING:
- Background: #FEF3C7
- Text Color: #92400E
- Border Color: #FDE68A

BADGE CONFIRMED:
- Background: #D1FAE5
- Text Color: #065F46
- Border Color: #A7F3D0

BADGE IN PROGRESS:
- Background: #DBEAFE
- Text Color: #1E40AF
- Border Color: #BFDBFE

BADGE COMPLETED:
- Background: #E9D5FF
- Text Color: #6B21A8
- Border Color: #DDD6FE

BADGE CANCELLED:
- Background: #FEE2E2
- Text Color: #991B1B
- Border Color: #FECACA

BADGE ACTIVE:
- Background: #D1FAE5
- Text Color: #065F46
- Border Color: #A7F3D0

BADGE INACTIVE:
- Background: #F3F4F6
- Text Color: #4B5563
- Border Color: #E5E7EB

BADGE VERIFIED (hijau dengan checkmark):
- Background: #10B981
- Text Color: #FFFFFF
- Padding: 4px 10px
- Border Radius: 6px
- Font Size: 11px
- Font Weight: 700
- Icon: check atau shield-check, size 12px, margin-right 4px


==================================================
🃏 DESIGN SYSTEM - CARDS
==================================================

STANDARD CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
- Hover Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
- Transition: all 0.3s ease

CARD HEADER:
- Font Size: 18px atau 20px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 16px
- Padding Bottom: 12px
- Border Bottom: 1px solid #E5E7EB

CARD BODY:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280
- Line Height: 24px

SERVICE CARD (untuk grid layanan):
- Width: 100% (dalam grid)
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Overflow: hidden
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Hover Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- Hover Transform: translateY(-4px)
- Transition: all 0.3s ease

SERVICE CARD IMAGE:
- Width: 100%
- Height: 200px
- Object Fit: cover
- Border Radius: 0 (karena di dalam card)

SERVICE CARD CONTENT:
- Padding: 16px

SERVICE CARD CATEGORY:
- Font Size: 12px
- Font Weight: 600
- Text Color: #6B7280
- Text Transform: uppercase
- Letter Spacing: 0.5px
- Margin Bottom: 8px

SERVICE CARD TITLE:
- Font Size: 16px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 8px
- Line Height: 24px
- Max Lines: 2 (ellipsis jika lebih)

SERVICE CARD RATING:
- Display: flex
- Align Items: center
- Gap: 4px
- Font Size: 14px
- Font Weight: 600
- Text Color: #F59E0B (untuk bintang)
- Margin Bottom: 12px

SERVICE CARD PRICE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #3B82F6
- Margin Bottom: 0

STAT CARD (untuk dashboard):
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%) atau warna solid
- Border: none
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Text Color: #FFFFFF

STAT CARD ICON:
- Width: 48px
- Height: 48px
- Background: rgba(255, 255, 255, 0.2)
- Border Radius: 12px
- Display: flex
- Align Items: center
- Justify Content: center
- Icon Size: 24px
- Icon Color: #FFFFFF
- Margin Bottom: 16px

STAT CARD VALUE:
- Font Size: 36px
- Font Weight: 800
- Text Color: #FFFFFF
- Line Height: 1
- Margin Bottom: 8px

STAT CARD LABEL:
- Font Size: 14px
- Font Weight: 500
- Text Color: rgba(255, 255, 255, 0.9)
- Line Height: 20px

==================================================
📊 DESIGN SYSTEM - TABLES
==================================================

TABLE CONTAINER:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Overflow: hidden
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

TABLE:
- Width: 100%
- Border Collapse: collapse
- Font Size: 14px

TABLE HEADER (thead):
- Background: #F9FAFB
- Border Bottom: 1px solid #E5E7EB

TABLE HEADER CELL (th):
- Padding: 12px 16px
- Text Align: left
- Font Size: 12px
- Font Weight: 700
- Text Color: #6B7280
- Text Transform: uppercase
- Letter Spacing: 0.5px
- White Space: nowrap

TABLE BODY ROW (tr):
- Border Bottom: 1px solid #F3F4F6
- Hover Background: #F9FAFB
- Transition: background 0.2s ease

TABLE BODY CELL (td):
- Padding: 16px
- Text Align: left
- Font Size: 14px
- Font Weight: 400
- Text Color: #111827
- Vertical Align: middle

TABLE CELL WITH IMAGE:
- Display: flex
- Align Items: center
- Gap: 12px

TABLE THUMBNAIL IMAGE:
- Width: 48px
- Height: 48px
- Border Radius: 8px
- Object Fit: cover

TABLE USER AVATAR:
- Width: 40px
- Height: 40px
- Border Radius: 9999px (full circle)
- Object Fit: cover

TABLE ACTION CELL:
- Display: flex
- Align Items: center
- Gap: 8px
- Justify Content: flex-start

TABLE EMPTY STATE:
- Padding: 48px 24px
- Text Align: center
- Font Size: 14px
- Font Weight: 400
- Text Color: #9CA3AF

TABLE PAGINATION:
- Display: flex
- Align Items: center
- Justify Content: space-between
- Padding: 16px 24px
- Border Top: 1px solid #E5E7EB
- Background: #F9FAFB


==================================================
🎯 DESIGN SYSTEM - MODALS
==================================================

MODAL OVERLAY:
- Position: fixed
- Top: 0
- Left: 0
- Right: 0
- Bottom: 0
- Background: rgba(0, 0, 0, 0.5)
- Z-Index: 1000
- Display: flex
- Align Items: center
- Justify Content: center
- Backdrop Filter: blur(2px)

MODAL CONTAINER:
- Background: #FFFFFF
- Border Radius: 16px
- Shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
- Max Width: 500px
- Width: 90%
- Padding: 32px
- Position: relative
- Animation: fadeIn 0.3s ease

MODAL ICON (warning/info):
- Width: 64px
- Height: 64px
- Background: #FEF3C7 (untuk warning) atau #DBEAFE (untuk info)
- Border Radius: 9999px (full circle)
- Display: flex
- Align Items: center
- Justify Content: center
- Margin: 0 auto 20px auto
- Icon Size: 32px
- Icon Color: #F59E0B (warning) atau #3B82F6 (info)

MODAL TITLE:
- Font Size: 24px
- Font Weight: 700
- Text Color: #111827
- Text Align: center
- Margin Bottom: 12px
- Line Height: 32px

MODAL MESSAGE:
- Font Size: 16px
- Font Weight: 400
- Text Color: #6B7280
- Text Align: center
- Line Height: 24px
- Margin Bottom: 24px

MODAL ACTIONS:
- Display: flex
- Gap: 12px
- Justify Content: center
- Flex Direction: row

MODAL CANCEL BUTTON:
- Background: #FFFFFF
- Text Color: #6B7280
- Border: 1px solid #D1D5DB
- Padding: 10px 24px
- Border Radius: 8px
- Font Size: 14px
- Font Weight: 600
- Hover Background: #F9FAFB
- Flex: 1
- Max Width: 150px

MODAL CONFIRM BUTTON:
- Background: #3B82F6 (atau #EF4444 untuk delete)
- Text Color: #FFFFFF
- Border: none
- Padding: 10px 24px
- Border Radius: 8px
- Font Size: 14px
- Font Weight: 600
- Hover Background: #2563EB (atau #DC2626 untuk delete)
- Flex: 1
- Max Width: 150px

MODAL CLOSE BUTTON (X di pojok):
- Position: absolute
- Top: 16px
- Right: 16px
- Width: 32px
- Height: 32px
- Background: transparent
- Border: none
- Border Radius: 6px
- Hover Background: #F3F4F6
- Icon: x atau times
- Icon Size: 20px
- Icon Color: #6B7280
- Cursor: pointer

==================================================
🧭 DESIGN SYSTEM - NAVIGATION
==================================================

HEADER / NAVBAR:
- Position: sticky
- Top: 0
- Width: 100%
- Height: 64px
- Background: #FFFFFF
- Border Bottom: 1px solid #E5E7EB
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Z-Index: 100
- Display: flex
- Align Items: center
- Padding: 0 24px

HEADER LOGO CONTAINER:
- Display: flex
- Align Items: center
- Gap: 12px

HEADER LOGO ICON:
- Width: 40px
- Height: 40px
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Border Radius: 10px
- Display: flex
- Align Items: center
- Justify Content: center
- Icon: search atau magnifying-glass
- Icon Size: 20px
- Icon Color: #FFFFFF

HEADER LOGO TEXT:
- Font Size: 24px
- Font Weight: 700
- Text Color: #111827
- Letter Spacing: -0.5px

HEADER MENU (tengah):
- Display: flex
- Align Items: center
- Gap: 32px
- Margin: 0 auto

HEADER MENU ITEM:
- Display: flex
- Align Items: center
- Gap: 8px
- Font Size: 14px
- Font Weight: 600
- Text Color: #6B7280
- Text Decoration: none
- Padding: 8px 12px
- Border Radius: 8px
- Hover Background: #F3F4F6
- Hover Text Color: #3B82F6
- Transition: all 0.2s ease

HEADER MENU ITEM ACTIVE:
- Background: #EFF6FF
- Text Color: #3B82F6

HEADER MENU ICON:
- Size: 16px
- Color: inherit

HEADER RIGHT SECTION:
- Display: flex
- Align Items: center
- Gap: 16px

HEADER NOTIFICATION BUTTON:
- Position: relative
- Width: 40px
- Height: 40px
- Background: transparent
- Border: none
- Border Radius: 8px
- Hover Background: #F3F4F6
- Icon: bell
- Icon Size: 20px
- Icon Color: #6B7280

HEADER NOTIFICATION BADGE:
- Position: absolute
- Top: 6px
- Right: 6px
- Width: 18px
- Height: 18px
- Background: #EF4444
- Border: 2px solid #FFFFFF
- Border Radius: 9999px
- Font Size: 10px
- Font Weight: 700
- Text Color: #FFFFFF
- Display: flex
- Align Items: center
- Justify Content: center

HEADER USER SECTION:
- Display: flex
- Align Items: center
- Gap: 12px
- Padding: 6px 12px 6px 6px
- Border Radius: 8px
- Hover Background: #F3F4F6
- Cursor: pointer
- Transition: all 0.2s ease

HEADER USER AVATAR:
- Width: 36px
- Height: 36px
- Border Radius: 9999px
- Object Fit: cover
- Border: 2px solid #E5E7EB

HEADER USER NAME:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827

HEADER USER DROPDOWN:
- Position: absolute
- Top: 100%
- Right: 0
- Margin Top: 8px
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- Min Width: 200px
- Padding: 8px
- Z-Index: 1000

HEADER DROPDOWN ITEM:
- Display: flex
- Align Items: center
- Gap: 12px
- Padding: 10px 12px
- Border Radius: 8px
- Font Size: 14px
- Font Weight: 500
- Text Color: #374151
- Hover Background: #F3F4F6
- Hover Text Color: #3B82F6
- Cursor: pointer
- Transition: all 0.2s ease

HEADER DROPDOWN DIVIDER:
- Height: 1px
- Background: #E5E7EB
- Margin: 8px 0


==================================================
📱 DESIGN SYSTEM - SIDEBAR (DASHBOARD)
==================================================

SIDEBAR CONTAINER:
- Position: fixed (desktop) atau drawer (mobile)
- Left: 0
- Top: 64px (di bawah header)
- Bottom: 0
- Width: 260px
- Background: #FFFFFF
- Border Right: 1px solid #E5E7EB
- Overflow Y: auto
- Z-Index: 50
- Display: flex
- Flex Direction: column

SIDEBAR HEADER:
- Padding: 20px 16px
- Border Bottom: 1px solid #E5E7EB
- Display: flex
- Align Items: center
- Gap: 12px

SIDEBAR HEADER ICON:
- Width: 36px
- Height: 36px
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Border Radius: 8px
- Display: flex
- Align Items: center
- Justify Content: center
- Icon: grid atau dashboard
- Icon Size: 18px
- Icon Color: #FFFFFF

SIDEBAR HEADER TEXT:
- Font Size: 16px
- Font Weight: 700
- Text Color: #111827

SIDEBAR MENU CONTAINER:
- Flex: 1
- Padding: 16px 12px
- Display: flex
- Flex Direction: column
- Gap: 4px

SIDEBAR MENU ITEM:
- Display: flex
- Align Items: center
- Gap: 12px
- Padding: 12px 16px
- Border Radius: 8px
- Font Size: 14px
- Font Weight: 500
- Text Color: #6B7280
- Text Decoration: none
- Cursor: pointer
- Transition: all 0.2s ease
- Position: relative

SIDEBAR MENU ITEM HOVER:
- Background: #F3F4F6
- Text Color: #374151

SIDEBAR MENU ITEM ACTIVE:
- Background: #EFF6FF
- Text Color: #3B82F6
- Font Weight: 600

SIDEBAR MENU ITEM ACTIVE INDICATOR (dot):
- Position: absolute
- Right: 12px
- Width: 6px
- Height: 6px
- Background: #3B82F6
- Border Radius: 9999px

SIDEBAR MENU ICON:
- Width: 20px
- Height: 20px
- Font Size: 20px
- Color: inherit
- Flex Shrink: 0

SIDEBAR DIVIDER:
- Height: 1px
- Background: #E5E7EB
- Margin: 12px 0

SIDEBAR FOOTER:
- Padding: 16px
- Border Top: 1px solid #E5E7EB
- Font Size: 12px
- Font Weight: 400
- Text Color: #9CA3AF
- Text Align: center

SIDEBAR FOOTER VERSION:
- Display: block
- Margin Top: 4px
- Font Weight: 600
- Text Color: #6B7280

MOBILE SIDEBAR TOGGLE (hamburger button):
- Position: fixed
- Bottom: 24px
- Right: 24px
- Width: 56px
- Height: 56px
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Border: none
- Border Radius: 9999px
- Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- Icon: bars atau menu
- Icon Size: 24px
- Icon Color: #FFFFFF
- Z-Index: 1000
- Display: none (tampil hanya di mobile)

MOBILE SIDEBAR OVERLAY:
- Position: fixed
- Top: 0
- Left: 0
- Right: 0
- Bottom: 0
- Background: rgba(0, 0, 0, 0.5)
- Z-Index: 40
- Display: none (tampil saat sidebar mobile terbuka)

==================================================
🦶 DESIGN SYSTEM - FOOTER
==================================================

FOOTER CONTAINER:
- Background: #1F2937
- Color: #F9FAFB
- Padding: 48px 24px 24px 24px
- Border Top: 1px solid #374151

FOOTER CONTENT:
- Max Width: 1280px
- Margin: 0 auto
- Display: grid
- Grid Template Columns: repeat(4, 1fr) (desktop) atau 1fr (mobile)
- Gap: 32px
- Margin Bottom: 32px

FOOTER COLUMN:
- Display: flex
- Flex Direction: column
- Gap: 16px

FOOTER BRAND SECTION:
- Display: flex
- Flex Direction: column
- Gap: 16px

FOOTER LOGO:
- Display: flex
- Align Items: center
- Gap: 12px

FOOTER LOGO ICON:
- Width: 36px
- Height: 36px
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Border Radius: 8px
- Display: flex
- Align Items: center
- Justify Content: center
- Icon: search
- Icon Size: 18px
- Icon Color: #FFFFFF

FOOTER LOGO TEXT:
- Font Size: 20px
- Font Weight: 700
- Text Color: #FFFFFF

FOOTER DESCRIPTION:
- Font Size: 14px
- Font Weight: 400
- Text Color: #D1D5DB
- Line Height: 22px

FOOTER SOCIAL ICONS:
- Display: flex
- Gap: 12px

FOOTER SOCIAL ICON:
- Width: 36px
- Height: 36px
- Background: #374151
- Border Radius: 8px
- Display: flex
- Align Items: center
- Justify Content: center
- Icon Size: 18px
- Icon Color: #F9FAFB
- Hover Background: #4B5563
- Transition: all 0.2s ease

FOOTER COLUMN TITLE:
- Font Size: 16px
- Font Weight: 700
- Text Color: #FFFFFF
- Margin Bottom: 4px

FOOTER LINK:
- Font Size: 14px
- Font Weight: 400
- Text Color: #D1D5DB
- Text Decoration: none
- Hover Text Color: #FFFFFF
- Hover Text Decoration: underline
- Transition: all 0.2s ease
- Display: flex
- Align Items: center
- Gap: 8px

FOOTER LINK ICON:
- Size: 14px
- Color: inherit

FOOTER BOTTOM:
- Border Top: 1px solid #374151
- Padding Top: 24px
- Display: flex
- Justify Content: space-between
- Align Items: center
- Flex Wrap: wrap
- Gap: 16px

FOOTER COPYRIGHT:
- Font Size: 14px
- Font Weight: 400
- Text Color: #9CA3AF

FOOTER BOTTOM LINKS:
- Display: flex
- Gap: 24px

FOOTER BOTTOM LINK:
- Font Size: 14px
- Font Weight: 400
- Text Color: #D1D5DB
- Text Decoration: none
- Hover Text Color: #FFFFFF
- Transition: all 0.2s ease

BACK TO TOP BUTTON:
- Position: fixed
- Bottom: 24px
- Right: 24px
- Width: 48px
- Height: 48px
- Background: #3B82F6
- Border: none
- Border Radius: 9999px
- Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- Icon: arrow-up atau chevron-up
- Icon Size: 20px
- Icon Color: #FFFFFF
- Hover Background: #2563EB
- Transition: all 0.2s ease
- Z-Index: 50


==================================================
🏠 HALAMAN BERANDA (HOME PAGE)
==================================================

HERO SECTION:
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Padding: 80px 24px
- Text Align: center
- Min Height: 600px
- Display: flex
- Flex Direction: column
- Justify Content: center
- Align Items: center

HERO TITLE:
- Font Size: 60px (desktop) atau 36px (mobile)
- Font Weight: 800
- Text Color: #FFFFFF
- Line Height: 1.1
- Margin Bottom: 16px
- Text "Temukan Jasa Terbaik"

HERO TITLE HIGHLIGHT:
- Text "Di Sekitar Anda"
- Color: #FDE68A (kuning terang)
- Font Weight: 800

HERO SUBTITLE:
- Font Size: 20px (desktop) atau 16px (mobile)
- Font Weight: 400
- Text Color: rgba(255, 255, 255, 0.9)
- Line Height: 30px
- Max Width: 700px
- Margin: 0 auto 40px auto

HERO SEARCH FORM:
- Background: #FFFFFF
- Border Radius: 16px
- Padding: 12px
- Shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
- Max Width: 800px
- Width: 100%
- Display: flex
- Gap: 12px
- Flex Wrap: wrap (mobile)

HERO SEARCH INPUT:
- Flex: 1
- Min Width: 250px
- Height: 56px
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 0 16px 0 48px
- Font Size: 16px
- Position: relative

HERO SEARCH INPUT ICON:
- Position: absolute
- Left: 16px
- Top: 50%
- Transform: translateY(-50%)
- Icon Size: 20px
- Icon Color: #9CA3AF

HERO SEARCH BUTTON:
- Height: 56px
- Padding: 0 32px
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Border: none
- Border Radius: 12px
- Font Size: 16px
- Font Weight: 700
- Text Color: #FFFFFF
- White Space: nowrap
- Hover Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2)
- Transition: all 0.3s ease

HERO STATS SECTION:
- Display: grid
- Grid Template Columns: repeat(4, 1fr) (desktop) atau repeat(2, 1fr) (mobile)
- Gap: 32px
- Max Width: 900px
- Width: 100%
- Margin Top: 60px

HERO STAT ITEM:
- Text Align: center

HERO STAT VALUE:
- Font Size: 36px
- Font Weight: 800
- Text Color: #FFFFFF
- Line Height: 1
- Margin Bottom: 8px

HERO STAT LABEL:
- Font Size: 14px
- Font Weight: 500
- Text Color: rgba(255, 255, 255, 0.8)

KATEGORI POPULER SECTION:
- Background: #FFFFFF
- Padding: 80px 24px

SECTION HEADER:
- Text Align: center
- Max Width: 700px
- Margin: 0 auto 48px auto

SECTION TITLE:
- Font Size: 36px (desktop) atau 28px (mobile)
- Font Weight: 800
- Text Color: #111827
- Margin Bottom: 12px
- Line Height: 1.2

SECTION SUBTITLE:
- Font Size: 18px (desktop) atau 16px (mobile)
- Font Weight: 400
- Text Color: #6B7280
- Line Height: 28px

KATEGORI GRID:
- Display: grid
- Grid Template Columns: repeat(4, 1fr) (desktop) atau repeat(2, 1fr) (mobile)
- Gap: 24px
- Max Width: 1280px
- Margin: 0 auto

KATEGORI CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Text Align: center
- Hover Border Color: #3B82F6
- Hover Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- Hover Transform: translateY(-4px)
- Transition: all 0.3s ease
- Cursor: pointer

KATEGORI ICON:
- Width: 64px
- Height: 64px
- Background: linear-gradient(135deg, #EFF6FF 0%, #E9D5FF 100%)
- Border Radius: 12px
- Display: flex
- Align Items: center
- Justify Content: center
- Margin: 0 auto 16px auto
- Icon Size: 32px
- Icon Color: #3B82F6

KATEGORI NAME:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 8px

KATEGORI COUNT:
- Font Size: 14px
- Font Weight: 500
- Text Color: #6B7280

CARA KERJA SECTION:
- Background: #F9FAFB
- Padding: 80px 24px

CARA KERJA GRID:
- Display: grid
- Grid Template Columns: repeat(3, 1fr) (desktop) atau 1fr (mobile)
- Gap: 32px
- Max Width: 1280px
- Margin: 0 auto

CARA KERJA ITEM:
- Text Align: center

CARA KERJA ICON:
- Width: 80px
- Height: 80px
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Border Radius: 9999px
- Display: flex
- Align Items: center
- Justify Content: center
- Margin: 0 auto 20px auto
- Icon Size: 40px
- Icon Color: #FFFFFF

CARA KERJA TITLE:
- Font Size: 20px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 12px

CARA KERJA DESCRIPTION:
- Font Size: 16px
- Font Weight: 400
- Text Color: #6B7280
- Line Height: 24px

LAYANAN UNGGULAN SECTION:
- Background: #FFFFFF
- Padding: 80px 24px

LAYANAN HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: center
- Max Width: 1280px
- Margin: 0 auto 32px auto
- Flex Wrap: wrap
- Gap: 16px

LAYANAN HEADER LEFT:
- Text Align: left

LAYANAN HEADER LINK:
- Display: flex
- Align Items: center
- Gap: 8px
- Font Size: 14px
- Font Weight: 600
- Text Color: #3B82F6
- Text Decoration: none
- Hover Text Color: #2563EB
- Transition: all 0.2s ease

LAYANAN GRID:
- Display: grid
- Grid Template Columns: repeat(4, 1fr) (desktop) atau 1fr (mobile)
- Gap: 24px
- Max Width: 1280px
- Margin: 0 auto

(Gunakan SERVICE CARD dari Design System - Cards)

TESTIMONI SECTION:
- Background: linear-gradient(135deg, #EFF6FF 0%, #F3E8FF 100%)
- Padding: 80px 24px

TESTIMONI GRID:
- Display: grid
- Grid Template Columns: repeat(3, 1fr) (desktop) atau 1fr (mobile)
- Gap: 24px
- Max Width: 1280px
- Margin: 0 auto

TESTIMONI CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

TESTIMONI RATING:
- Display: flex
- Gap: 4px
- Margin Bottom: 16px

TESTIMONI STAR:
- Icon: star (filled)
- Icon Size: 16px
- Icon Color: #F59E0B

TESTIMONI COMMENT:
- Font Size: 14px
- Font Weight: 400
- Text Color: #374151
- Line Height: 22px
- Margin Bottom: 16px
- Font Style: italic

TESTIMONI FOOTER:
- Display: flex
- Align Items: center
- Gap: 12px
- Padding Top: 16px
- Border Top: 1px solid #E5E7EB

TESTIMONI AVATAR:
- Width: 40px
- Height: 40px
- Border Radius: 9999px
- Object Fit: cover

TESTIMONI INFO:
- Flex: 1

TESTIMONI NAME:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827
- Margin Bottom: 2px

TESTIMONI SERVICE:
- Font Size: 12px
- Font Weight: 400
- Text Color: #6B7280

CTA SECTION:
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Padding: 80px 24px
- Text Align: center

CTA TITLE:
- Font Size: 36px (desktop) atau 28px (mobile)
- Font Weight: 800
- Text Color: #FFFFFF
- Margin Bottom: 16px

CTA SUBTITLE:
- Font Size: 18px (desktop) atau 16px (mobile)
- Font Weight: 400
- Text Color: rgba(255, 255, 255, 0.9)
- Line Height: 28px
- Max Width: 700px
- Margin: 0 auto 32px auto

CTA BUTTONS:
- Display: flex
- Gap: 16px
- Justify Content: center
- Flex Wrap: wrap

CTA BUTTON PRIMARY:
- Background: #FFFFFF
- Text Color: #3B82F6
- Padding: 14px 32px
- Border Radius: 12px
- Font Size: 16px
- Font Weight: 700
- Border: none
- Hover Background: #F9FAFB
- Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)

CTA BUTTON SECONDARY:
- Background: transparent
- Text Color: #FFFFFF
- Padding: 14px 32px
- Border Radius: 12px
- Font Size: 16px
- Font Weight: 700
- Border: 2px solid #FFFFFF
- Hover Background: rgba(255, 255, 255, 0.1)


==================================================
🔍 HALAMAN CARI JASA (SEARCH PAGE)
==================================================

PAGE CONTAINER:
- Background: #F9FAFB
- Min Height: 100vh
- Padding: 24px

SEARCH HEADER:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Margin Bottom: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

SEARCH FORM:
- Display: grid
- Grid Template Columns: 2fr 2fr 1.5fr 1fr 1fr auto (desktop) atau 1fr (mobile)
- Gap: 12px
- Align Items: end

SEARCH INPUT GROUP:
- Display: flex
- Flex Direction: column
- Gap: 6px

SEARCH LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #374151

SEARCH INPUT:
- Height: 42px
- (gunakan TEXT INPUT dari Design System)

SEARCH SELECT:
- Height: 42px
- (gunakan SELECT DROPDOWN dari Design System)

SEARCH BUTTON:
- Height: 42px
- Padding: 0 24px
- (gunakan PRIMARY BUTTON dari Design System)

SEARCH RESULTS CONTAINER:
- Display: grid
- Grid Template Columns: 1fr (full width)
- Gap: 24px

SEARCH RESULTS HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: center
- Margin Bottom: 16px

SEARCH RESULTS COUNT:
- Font Size: 16px
- Font Weight: 600
- Text Color: #111827

SEARCH RESULTS SORT:
- Display: flex
- Align Items: center
- Gap: 12px

SEARCH RESULTS SORT LABEL:
- Font Size: 14px
- Font Weight: 500
- Text Color: #6B7280

SEARCH RESULTS SORT SELECT:
- Width: 200px
- (gunakan SELECT DROPDOWN dari Design System)

SEARCH RESULTS GRID:
- Display: grid
- Grid Template Columns: repeat(3, 1fr) (desktop) atau 1fr (mobile)
- Gap: 24px

(Gunakan SERVICE CARD dari Design System - Cards untuk setiap item)

SEARCH EMPTY STATE:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 64px 24px
- Text Align: center

EMPTY STATE ICON:
- Width: 80px
- Height: 80px
- Background: #F3F4F6
- Border Radius: 9999px
- Display: flex
- Align Items: center
- Justify Content: center
- Margin: 0 auto 20px auto
- Icon: search atau magnifying-glass
- Icon Size: 40px
- Icon Color: #9CA3AF

EMPTY STATE TITLE:
- Font Size: 20px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 8px

EMPTY STATE MESSAGE:
- Font Size: 16px
- Font Weight: 400
- Text Color: #6B7280
- Line Height: 24px

==================================================
📄 HALAMAN DETAIL LAYANAN (SERVICE DETAIL)
==================================================

PAGE CONTAINER:
- Background: #F9FAFB
- Min Height: 100vh
- Padding: 24px

DETAIL CONTAINER:
- Max Width: 1280px
- Margin: 0 auto
- Display: grid
- Grid Template Columns: 2fr 1fr (desktop) atau 1fr (mobile)
- Gap: 24px

DETAIL LEFT SECTION:
- Display: flex
- Flex Direction: column
- Gap: 24px

SERVICE IMAGE CONTAINER:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Overflow: hidden
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

SERVICE IMAGE:
- Width: 100%
- Height: 400px (desktop) atau 250px (mobile)
- Object Fit: cover

SERVICE INFO CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

SERVICE TITLE:
- Font Size: 28px (desktop) atau 24px (mobile)
- Font Weight: 800
- Text Color: #111827
- Line Height: 1.3
- Margin Bottom: 12px

SERVICE META:
- Display: flex
- Align Items: center
- Gap: 16px
- Flex Wrap: wrap
- Margin Bottom: 16px

SERVICE CATEGORY BADGE:
- Display: inline-flex
- Align Items: center
- Gap: 6px
- Padding: 6px 12px
- Background: #EFF6FF
- Border: 1px solid #BFDBFE
- Border Radius: 8px
- Font Size: 13px
- Font Weight: 600
- Text Color: #1E40AF

SERVICE RATING:
- Display: flex
- Align Items: center
- Gap: 6px

SERVICE RATING STARS:
- Display: flex
- Gap: 2px
- Icon: star (filled)
- Icon Size: 16px
- Icon Color: #F59E0B

SERVICE RATING TEXT:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827

SERVICE RATING COUNT:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280

SERVICE PRICE:
- Font Size: 32px
- Font Weight: 800
- Text Color: #3B82F6
- Margin Bottom: 16px

SERVICE DETAILS LIST:
- Display: flex
- Flex Direction: column
- Gap: 12px
- Margin Bottom: 24px

SERVICE DETAIL ITEM:
- Display: flex
- Align Items: center
- Gap: 12px

SERVICE DETAIL ICON:
- Width: 20px
- Height: 20px
- Color: #6B7280
- Flex Shrink: 0

SERVICE DETAIL LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #6B7280
- Min Width: 100px

SERVICE DETAIL VALUE:
- Font Size: 14px
- Font Weight: 500
- Text Color: #111827

SERVICE DESCRIPTION SECTION:
- Margin Top: 24px
- Padding Top: 24px
- Border Top: 1px solid #E5E7EB

SERVICE DESCRIPTION TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 12px

SERVICE DESCRIPTION TEXT:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280
- Line Height: 24px

PROVIDER INFO CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

PROVIDER INFO TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 16px

PROVIDER INFO CONTENT:
- Display: flex
- Align Items: center
- Gap: 16px
- Margin Bottom: 16px

PROVIDER AVATAR:
- Width: 64px
- Height: 64px
- Border Radius: 9999px
- Object Fit: cover
- Border: 2px solid #E5E7EB

PROVIDER INFO TEXT:
- Flex: 1

PROVIDER NAME:
- Font Size: 16px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 4px

PROVIDER EMAIL:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280
- Margin Bottom: 2px

PROVIDER PHONE:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280

DETAIL RIGHT SECTION (BOOKING FORM):
- Position: sticky
- Top: 88px (64px header + 24px spacing)

BOOKING FORM CARD:
- Background: #FFFFFF
- Border: 2px solid #3B82F6
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)

BOOKING FORM TITLE:
- Font Size: 20px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 20px
- Text Align: center

BOOKING FORM GROUP:
- Margin Bottom: 16px

BOOKING FORM LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #374151
- Margin Bottom: 6px
- Display: block

BOOKING FORM INPUT:
- (gunakan TEXT INPUT dari Design System)

BOOKING FORM TEXTAREA:
- Min Height: 100px
- Resize: vertical
- (gunakan TEXTAREA dari Design System)

BOOKING FORM BUTTON:
- Width: 100%
- Height: 48px
- Font Size: 16px
- (gunakan PRIMARY BUTTON dari Design System)

BOOKING FORM NOTE:
- Font Size: 12px
- Font Weight: 400
- Text Color: #6B7280
- Text Align: center
- Margin Top: 12px
- Line Height: 18px

REVIEWS TAB SECTION:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

REVIEWS TAB TITLE:
- Font Size: 20px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 20px

REVIEW ITEM:
- Padding: 16px 0
- Border Bottom: 1px solid #F3F4F6

REVIEW ITEM:last-child:
- Border Bottom: none

REVIEW HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: start
- Margin Bottom: 8px

REVIEW USER INFO:
- Display: flex
- Align Items: center
- Gap: 12px

REVIEW USER AVATAR:
- Width: 40px
- Height: 40px
- Border Radius: 9999px
- Object Fit: cover

REVIEW USER NAME:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827

REVIEW RATING:
- Display: flex
- Gap: 2px

REVIEW STAR:
- Icon: star (filled)
- Icon Size: 14px
- Icon Color: #F59E0B

REVIEW COMMENT:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280
- Line Height: 22px
- Margin Bottom: 8px

REVIEW DATE:
- Font Size: 12px
- Font Weight: 400
- Text Color: #9CA3AF


==================================================
🔐 HALAMAN LOGIN
==================================================

PAGE CONTAINER:
- Background: linear-gradient(135deg, #EFF6FF 0%, #F3E8FF 100%)
- Min Height: 100vh
- Display: flex
- Align Items: center
- Justify Content: center
- Padding: 24px

LOGIN CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 16px
- Padding: 40px
- Shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
- Max Width: 450px
- Width: 100%

LOGIN LOGO:
- Display: flex
- Align Items: center
- Justify Content: center
- Gap: 12px
- Margin Bottom: 32px

LOGIN LOGO ICON:
- Width: 48px
- Height: 48px
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Border Radius: 12px
- Display: flex
- Align Items: center
- Justify Content: center
- Icon: search
- Icon Size: 24px
- Icon Color: #FFFFFF

LOGIN LOGO TEXT:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827

LOGIN TITLE:
- Font Size: 24px
- Font Weight: 700
- Text Color: #111827
- Text Align: center
- Margin Bottom: 8px

LOGIN SUBTITLE:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280
- Text Align: center
- Margin Bottom: 32px

LOGIN FORM:
- Display: flex
- Flex Direction: column
- Gap: 20px

LOGIN FORM GROUP:
- Display: flex
- Flex Direction: column
- Gap: 6px

LOGIN LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #374151

LOGIN INPUT:
- (gunakan TEXT INPUT dari Design System)

LOGIN PASSWORD INPUT:
- Position: relative

LOGIN PASSWORD TOGGLE:
- Position: absolute
- Right: 12px
- Top: 50%
- Transform: translateY(-50%)
- Background: transparent
- Border: none
- Cursor: pointer
- Icon: eye atau eye-slash
- Icon Size: 18px
- Icon Color: #9CA3AF

LOGIN FORGOT PASSWORD:
- Font Size: 14px
- Font Weight: 500
- Text Color: #3B82F6
- Text Decoration: none
- Text Align: right
- Hover Text Color: #2563EB
- Hover Text Decoration: underline

LOGIN BUTTON:
- Width: 100%
- Height: 48px
- Font Size: 16px
- Margin Top: 8px
- (gunakan PRIMARY BUTTON dari Design System)

LOGIN DIVIDER:
- Display: flex
- Align Items: center
- Gap: 16px
- Margin: 24px 0

LOGIN DIVIDER LINE:
- Flex: 1
- Height: 1px
- Background: #E5E7EB

LOGIN DIVIDER TEXT:
- Font Size: 14px
- Font Weight: 500
- Text Color: #9CA3AF

LOGIN REGISTER LINK:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280
- Text Align: center

LOGIN REGISTER LINK HIGHLIGHT:
- Font Weight: 600
- Text Color: #3B82F6
- Text Decoration: none
- Hover Text Color: #2563EB
- Hover Text Decoration: underline

LOGIN ALERT (error/success):
- Padding: 12px 16px
- Border Radius: 8px
- Font Size: 14px
- Font Weight: 500
- Margin Bottom: 20px
- Display: flex
- Align Items: center
- Gap: 12px

LOGIN ALERT ERROR:
- Background: #FEE2E2
- Border: 1px solid #FECACA
- Text Color: #991B1B
- Icon: exclamation-circle
- Icon Color: #EF4444

LOGIN ALERT SUCCESS:
- Background: #D1FAE5
- Border: 1px solid #A7F3D0
- Text Color: #065F46
- Icon: check-circle
- Icon Color: #10B981

==================================================
📝 HALAMAN REGISTER
==================================================

(Gunakan layout yang sama dengan LOGIN PAGE)

REGISTER CARD:
- Max Width: 600px
- (gunakan LOGIN CARD styling)

REGISTER FORM:
- Display: flex
- Flex Direction: column
- Gap: 20px

REGISTER ROLE SELECTION:
- Display: grid
- Grid Template Columns: 1fr 1fr
- Gap: 12px
- Margin Bottom: 8px

REGISTER ROLE OPTION:
- Display: flex
- Flex Direction: column
- Align Items: center
- Justify Content: center
- Padding: 20px
- Border: 2px solid #E5E7EB
- Border Radius: 12px
- Background: #FFFFFF
- Cursor: pointer
- Transition: all 0.2s ease

REGISTER ROLE OPTION HOVER:
- Border Color: #3B82F6
- Background: #EFF6FF

REGISTER ROLE OPTION ACTIVE:
- Border Color: #3B82F6
- Background: #EFF6FF
- Box Shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)

REGISTER ROLE ICON:
- Width: 48px
- Height: 48px
- Background: linear-gradient(135deg, #EFF6FF 0%, #E9D5FF 100%)
- Border Radius: 12px
- Display: flex
- Align Items: center
- Justify Content: center
- Margin Bottom: 12px
- Icon Size: 24px
- Icon Color: #3B82F6

REGISTER ROLE LABEL:
- Font Size: 16px
- Font Weight: 600
- Text Color: #111827

REGISTER FORM GRID:
- Display: grid
- Grid Template Columns: 1fr 1fr (untuk nama dan email) atau 1fr (untuk field lain)
- Gap: 20px

REGISTER INPUT:
- (gunakan TEXT INPUT dari Design System)

REGISTER BUTTON:
- Width: 100%
- Height: 48px
- Font Size: 16px
- Margin Top: 8px
- (gunakan PRIMARY BUTTON dari Design System)

REGISTER LOGIN LINK:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280
- Text Align: center
- Margin Top: 16px

REGISTER LOGIN LINK HIGHLIGHT:
- Font Weight: 600
- Text Color: #3B82F6
- Text Decoration: none
- Hover Text Color: #2563EB
- Hover Text Decoration: underline

==================================================
🔑 HALAMAN FORGOT PASSWORD
==================================================

(Gunakan layout yang sama dengan LOGIN PAGE)

FORGOT PASSWORD CARD:
- Max Width: 450px
- (gunakan LOGIN CARD styling)

FORGOT PASSWORD ICON:
- Width: 64px
- Height: 64px
- Background: #EFF6FF
- Border Radius: 9999px
- Display: flex
- Align Items: center
- Justify Content: center
- Margin: 0 auto 24px auto
- Icon: key atau lock
- Icon Size: 32px
- Icon Color: #3B82F6

FORGOT PASSWORD TITLE:
- Font Size: 24px
- Font Weight: 700
- Text Color: #111827
- Text Align: center
- Margin Bottom: 8px

FORGOT PASSWORD DESCRIPTION:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280
- Text Align: center
- Line Height: 22px
- Margin Bottom: 32px

FORGOT PASSWORD FORM:
- Display: flex
- Flex Direction: column
- Gap: 20px

FORGOT PASSWORD INPUT:
- (gunakan TEXT INPUT dari Design System)

FORGOT PASSWORD BUTTON:
- Width: 100%
- Height: 48px
- Font Size: 16px
- (gunakan PRIMARY BUTTON dari Design System)

FORGOT PASSWORD BACK LINK:
- Display: flex
- Align Items: center
- Justify Content: center
- Gap: 8px
- Font Size: 14px
- Font Weight: 500
- Text Color: #6B7280
- Text Decoration: none
- Margin Top: 16px
- Hover Text Color: #3B82F6
- Icon: arrow-left
- Icon Size: 16px

==================================================
🔄 HALAMAN RESET PASSWORD
==================================================

(Gunakan layout yang sama dengan FORGOT PASSWORD PAGE)

RESET PASSWORD CARD:
- Max Width: 450px
- (gunakan LOGIN CARD styling)

RESET PASSWORD ICON:
- (gunakan FORGOT PASSWORD ICON styling)
- Icon: shield-check atau lock-open

RESET PASSWORD TITLE:
- Font Size: 24px
- Font Weight: 700
- Text Color: #111827
- Text Align: center
- Margin Bottom: 8px

RESET PASSWORD DESCRIPTION:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280
- Text Align: center
- Line Height: 22px
- Margin Bottom: 32px

RESET PASSWORD FORM:
- Display: flex
- Flex Direction: column
- Gap: 20px

RESET PASSWORD INPUT:
- (gunakan TEXT INPUT dari Design System)
- Type: password

RESET PASSWORD REQUIREMENTS:
- Background: #F9FAFB
- Border: 1px solid #E5E7EB
- Border Radius: 8px
- Padding: 12px 16px
- Margin Top: 8px

RESET PASSWORD REQUIREMENT ITEM:
- Display: flex
- Align Items: center
- Gap: 8px
- Font Size: 12px
- Font Weight: 400
- Text Color: #6B7280
- Margin Bottom: 4px

RESET PASSWORD REQUIREMENT ITEM:last-child:
- Margin Bottom: 0

RESET PASSWORD REQUIREMENT ICON:
- Icon: check-circle atau x-circle
- Icon Size: 14px
- Icon Color: #10B981 (valid) atau #9CA3AF (invalid)

RESET PASSWORD BUTTON:
- Width: 100%
- Height: 48px
- Font Size: 16px
- Margin Top: 8px
- (gunakan PRIMARY BUTTON dari Design System)


==================================================
👤 CUSTOMER DASHBOARD
==================================================

DASHBOARD LAYOUT:
- (gunakan HEADER dari Design System - Navigation)
- (gunakan SIDEBAR dari Design System - Sidebar)
- Main Content Area di kanan sidebar

CUSTOMER SIDEBAR MENU ITEMS:
1. Dashboard (icon: grid atau dashboard)
2. Booking Saya (icon: calendar atau calendar-check)
3. Review Saya (icon: star)
4. Pengaturan (icon: cog atau settings)
5. Kembali ke Beranda (icon: home)
6. Keluar (icon: sign-out atau logout)

DASHBOARD MAIN CONTENT:
- Padding: 24px
- Background: #F9FAFB
- Min Height: calc(100vh - 64px)

DASHBOARD WELCOME CARD:
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Border: none
- Border Radius: 16px
- Padding: 32px
- Margin Bottom: 24px
- Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)

DASHBOARD WELCOME TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #FFFFFF
- Margin Bottom: 8px

DASHBOARD WELCOME SUBTITLE:
- Font Size: 16px
- Font Weight: 400
- Text Color: rgba(255, 255, 255, 0.9)
- Line Height: 24px

DASHBOARD STATS GRID:
- Display: grid
- Grid Template Columns: repeat(4, 1fr) (desktop) atau repeat(2, 1fr) (mobile)
- Gap: 20px
- Margin Bottom: 24px

(Gunakan STAT CARD dari Design System - Cards)

DASHBOARD QUICK ACTIONS:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

DASHBOARD QUICK ACTIONS TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 16px

DASHBOARD QUICK ACTIONS GRID:
- Display: grid
- Grid Template Columns: repeat(3, 1fr) (desktop) atau 1fr (mobile)
- Gap: 16px

DASHBOARD QUICK ACTION BUTTON:
- Display: flex
- Flex Direction: column
- Align Items: center
- Justify Content: center
- Padding: 24px
- Background: #F9FAFB
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Text Decoration: none
- Hover Background: #EFF6FF
- Hover Border Color: #3B82F6
- Transition: all 0.2s ease

DASHBOARD QUICK ACTION ICON:
- Width: 56px
- Height: 56px
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Border Radius: 12px
- Display: flex
- Align Items: center
- Justify Content: center
- Margin Bottom: 12px
- Icon Size: 28px
- Icon Color: #FFFFFF

DASHBOARD QUICK ACTION LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827
- Text Align: center

==================================================
📅 CUSTOMER BOOKINGS (BOOKING SAYA)
==================================================

BOOKINGS PAGE HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: center
- Margin Bottom: 24px

BOOKINGS PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827

BOOKINGS FILTER:
- Display: flex
- Gap: 12px
- Align Items: center

BOOKINGS FILTER SELECT:
- Width: 200px
- (gunakan SELECT DROPDOWN dari Design System)

BOOKINGS FILTER BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)

BOOKINGS TABLE CONTAINER:
- (gunakan TABLE CONTAINER dari Design System - Tables)

BOOKINGS TABLE:
- (gunakan TABLE dari Design System - Tables)

BOOKINGS TABLE COLUMNS:
1. ID (width: 80px)
2. Layanan (width: auto, min-width: 200px)
3. Provider (width: 180px)
4. Tanggal & Waktu (width: 180px)
5. Status (width: 120px)
6. Total (width: 120px)
7. Aksi (width: 120px)

BOOKINGS TABLE SERVICE CELL:
- Display: flex
- Align Items: center
- Gap: 12px

BOOKINGS TABLE SERVICE IMAGE:
- Width: 48px
- Height: 48px
- Border Radius: 8px
- Object Fit: cover

BOOKINGS TABLE SERVICE INFO:
- Display: flex
- Flex Direction: column
- Gap: 4px

BOOKINGS TABLE SERVICE NAME:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827

BOOKINGS TABLE SERVICE CATEGORY:
- Font Size: 12px
- Font Weight: 400
- Text Color: #6B7280

BOOKINGS TABLE STATUS CELL:
- (gunakan BADGE dari Design System - Badges)

BOOKINGS TABLE PRICE:
- Font Size: 14px
- Font Weight: 700
- Text Color: #3B82F6

BOOKINGS TABLE ACTIONS:
- Display: flex
- Gap: 8px

BOOKINGS TABLE ACTION BUTTON:
- (gunakan ICON BUTTON dari Design System - Buttons)

BOOKINGS TABLE ACTION ICON VIEW:
- Icon: eye
- Hover Color: #3B82F6

BOOKINGS TABLE ACTION ICON CANCEL:
- Icon: x atau times
- Hover Color: #EF4444

BOOKINGS TABLE ACTION ICON REVIEW:
- Icon: star
- Hover Color: #F59E0B

==================================================
📋 CUSTOMER BOOKING DETAIL
==================================================

BOOKING DETAIL CONTAINER:
- Max Width: 1000px
- Margin: 0 auto

BOOKING DETAIL HEADER:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Margin Bottom: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Display: flex
- Justify Content: space-between
- Align Items: center

BOOKING DETAIL TITLE:
- Font Size: 24px
- Font Weight: 700
- Text Color: #111827

BOOKING DETAIL STATUS:
- (gunakan BADGE dari Design System - Badges)
- Font Size: 14px
- Padding: 6px 16px

BOOKING DETAIL GRID:
- Display: grid
- Grid Template Columns: 1fr 1fr (desktop) atau 1fr (mobile)
- Gap: 24px

BOOKING DETAIL CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

BOOKING DETAIL CARD TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 16px
- Padding Bottom: 12px
- Border Bottom: 1px solid #E5E7EB

BOOKING DETAIL INFO LIST:
- Display: flex
- Flex Direction: column
- Gap: 12px

BOOKING DETAIL INFO ITEM:
- Display: flex
- Justify Content: space-between
- Align Items: start
- Gap: 16px

BOOKING DETAIL INFO LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #6B7280
- Min Width: 120px

BOOKING DETAIL INFO VALUE:
- Font Size: 14px
- Font Weight: 500
- Text Color: #111827
- Text Align: right

BOOKING DETAIL SERVICE IMAGE:
- Width: 100%
- Height: 200px
- Border Radius: 8px
- Object Fit: cover
- Margin Bottom: 16px

BOOKING DETAIL ACTIONS:
- Display: flex
- Gap: 12px
- Margin Top: 24px
- Justify Content: flex-end

BOOKING DETAIL BUTTON BACK:
- (gunakan SECONDARY BUTTON dari Design System)

BOOKING DETAIL BUTTON CANCEL:
- (gunakan DANGER BUTTON dari Design System)

BOOKING DETAIL BUTTON REVIEW:
- Background: #F59E0B
- (gunakan PRIMARY BUTTON styling dari Design System)

==================================================
⭐ CUSTOMER REVIEWS (REVIEW SAYA)
==================================================

REVIEWS PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827
- Margin Bottom: 24px

REVIEWS LIST:
- Display: flex
- Flex Direction: column
- Gap: 16px

REVIEW CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 20px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

REVIEW CARD HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: start
- Margin Bottom: 12px

REVIEW CARD SERVICE INFO:
- Display: flex
- Align Items: center
- Gap: 12px

REVIEW CARD SERVICE IMAGE:
- Width: 56px
- Height: 56px
- Border Radius: 8px
- Object Fit: cover

REVIEW CARD SERVICE DETAILS:
- Display: flex
- Flex Direction: column
- Gap: 4px

REVIEW CARD SERVICE NAME:
- Font Size: 16px
- Font Weight: 700
- Text Color: #111827

REVIEW CARD PROVIDER NAME:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280

REVIEW CARD RATING:
- Display: flex
- Gap: 4px

REVIEW CARD STAR:
- Icon: star (filled)
- Icon Size: 18px
- Icon Color: #F59E0B

REVIEW CARD COMMENT:
- Font Size: 14px
- Font Weight: 400
- Text Color: #374151
- Line Height: 22px
- Margin Bottom: 12px

REVIEW CARD DATE:
- Font Size: 12px
- Font Weight: 400
- Text Color: #9CA3AF

REVIEW FORM CARD:
- Background: #FFFFFF
- Border: 2px solid #3B82F6
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Margin Bottom: 24px

REVIEW FORM TITLE:
- Font Size: 20px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 16px

REVIEW FORM RATING SELECTOR:
- Display: flex
- Gap: 8px
- Margin Bottom: 16px

REVIEW FORM STAR BUTTON:
- Width: 40px
- Height: 40px
- Background: transparent
- Border: none
- Cursor: pointer
- Icon: star
- Icon Size: 32px
- Icon Color: #D1D5DB (unselected) atau #F59E0B (selected)
- Hover Icon Color: #F59E0B
- Transition: all 0.2s ease

REVIEW FORM TEXTAREA:
- (gunakan TEXTAREA dari Design System)
- Min Height: 120px

REVIEW FORM BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)


==================================================
⚙️ CUSTOMER SETTINGS (PENGATURAN)
==================================================

SETTINGS PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827
- Margin Bottom: 24px

SETTINGS CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 32px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Max Width: 800px

SETTINGS FORM:
- Display: flex
- Flex Direction: column
- Gap: 24px

SETTINGS PROFILE PHOTO SECTION:
- Display: flex
- Flex Direction: column
- Align Items: center
- Gap: 16px
- Padding: 24px
- Background: #F9FAFB
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Margin Bottom: 8px

SETTINGS PROFILE PHOTO:
- Width: 120px
- Height: 120px
- Border Radius: 9999px
- Object Fit: cover
- Border: 4px solid #FFFFFF
- Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)

SETTINGS PROFILE PHOTO UPLOAD:
- Display: flex
- Flex Direction: column
- Align Items: center
- Gap: 12px

SETTINGS PROFILE PHOTO BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)
- Font Size: 14px
- Padding: 8px 20px

SETTINGS PROFILE PHOTO HINT:
- Font Size: 12px
- Font Weight: 400
- Text Color: #9CA3AF
- Text Align: center

SETTINGS FORM GRID:
- Display: grid
- Grid Template Columns: 1fr 1fr (desktop) atau 1fr (mobile)
- Gap: 20px

SETTINGS FORM GROUP:
- Display: flex
- Flex Direction: column
- Gap: 6px

SETTINGS LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #374151

SETTINGS INPUT:
- (gunakan TEXT INPUT dari Design System)

SETTINGS TEXTAREA:
- (gunakan TEXTAREA dari Design System)
- Min Height: 100px

SETTINGS PASSWORD SECTION:
- Padding Top: 24px
- Margin Top: 24px
- Border Top: 1px solid #E5E7EB

SETTINGS PASSWORD TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 16px

SETTINGS PASSWORD HINT:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280
- Margin Bottom: 16px
- Padding: 12px 16px
- Background: #FEF3C7
- Border: 1px solid #FDE68A
- Border Radius: 8px

SETTINGS ACTIONS:
- Display: flex
- Gap: 12px
- Justify Content: flex-end
- Margin Top: 8px

SETTINGS BUTTON CANCEL:
- (gunakan SECONDARY BUTTON dari Design System)

SETTINGS BUTTON SAVE:
- (gunakan PRIMARY BUTTON dari Design System)

==================================================
🏢 PROVIDER DASHBOARD
==================================================

PROVIDER SIDEBAR MENU ITEMS:
1. Dashboard (icon: grid atau dashboard)
2. Bookings (icon: calendar-check)
3. Layanan Saya (icon: briefcase atau service)
4. Penghasilan (icon: dollar-sign atau money)
5. Ulasan (icon: star)
6. Pengaturan (icon: cog)
7. Kembali ke Beranda (icon: home)
8. Keluar (icon: sign-out)

PROVIDER DASHBOARD WELCOME CARD:
- (gunakan DASHBOARD WELCOME CARD dari Customer Dashboard)

PROVIDER DASHBOARD STATS GRID:
- Display: grid
- Grid Template Columns: repeat(4, 1fr) (desktop) atau repeat(2, 1fr) (mobile)
- Gap: 20px
- Margin Bottom: 24px

PROVIDER STAT CARD 1 (Total Bookings):
- Background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)
- Icon: calendar-check

PROVIDER STAT CARD 2 (Total Layanan):
- Background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)
- Icon: briefcase

PROVIDER STAT CARD 3 (Total Penghasilan):
- Background: linear-gradient(135deg, #10B981 0%, #059669 100%)
- Icon: dollar-sign

PROVIDER STAT CARD 4 (Rating Rata-rata):
- Background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%)
- Icon: star

(Gunakan STAT CARD styling dari Design System - Cards)

PROVIDER DASHBOARD QUICK ACTIONS:
- (gunakan DASHBOARD QUICK ACTIONS dari Customer Dashboard)

==================================================
📆 PROVIDER BOOKINGS
==================================================

PROVIDER BOOKINGS PAGE HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: center
- Margin Bottom: 24px

PROVIDER BOOKINGS TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827

PROVIDER BOOKINGS FILTER:
- Display: flex
- Gap: 12px
- Align Items: center

PROVIDER BOOKINGS FILTER LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #374151

PROVIDER BOOKINGS FILTER SELECT:
- Width: 200px
- (gunakan SELECT DROPDOWN dari Design System)

PROVIDER BOOKINGS FILTER BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)

PROVIDER BOOKINGS TABLE:
- (gunakan TABLE dari Design System - Tables)

PROVIDER BOOKINGS TABLE COLUMNS:
1. ID (width: 80px)
2. Customer (width: 180px)
3. Layanan (width: auto, min-width: 200px)
4. Tanggal & Waktu (width: 180px)
5. Status (width: 120px)
6. Total (width: 120px)
7. Aksi (width: 160px)

PROVIDER BOOKINGS TABLE CUSTOMER CELL:
- Display: flex
- Align Items: center
- Gap: 12px

PROVIDER BOOKINGS TABLE CUSTOMER AVATAR:
- Width: 40px
- Height: 40px
- Border Radius: 9999px
- Object Fit: cover

PROVIDER BOOKINGS TABLE CUSTOMER INFO:
- Display: flex
- Flex Direction: column
- Gap: 2px

PROVIDER BOOKINGS TABLE CUSTOMER NAME:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827

PROVIDER BOOKINGS TABLE CUSTOMER EMAIL:
- Font Size: 12px
- Font Weight: 400
- Text Color: #6B7280

PROVIDER BOOKINGS TABLE ACTIONS:
- Display: flex
- Gap: 6px

PROVIDER BOOKINGS ACTION BUTTON VIEW:
- (gunakan ICON BUTTON dari Design System)
- Icon: eye
- Hover Color: #3B82F6

PROVIDER BOOKINGS ACTION BUTTON CONFIRM:
- (gunakan ICON BUTTON dari Design System)
- Icon: check
- Hover Color: #10B981

PROVIDER BOOKINGS ACTION BUTTON CANCEL:
- (gunakan ICON BUTTON dari Design System)
- Icon: x
- Hover Color: #EF4444

PROVIDER BOOKINGS ACTION BUTTON COMPLETE:
- (gunakan ICON BUTTON dari Design System)
- Icon: check-double atau check-circle
- Hover Color: #8B5CF6

==================================================
📝 PROVIDER BOOKING DETAIL
==================================================

(Gunakan layout yang sama dengan CUSTOMER BOOKING DETAIL)

PROVIDER BOOKING DETAIL CUSTOMER CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

PROVIDER BOOKING DETAIL CUSTOMER TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 16px
- Padding Bottom: 12px
- Border Bottom: 1px solid #E5E7EB

PROVIDER BOOKING DETAIL CUSTOMER INFO:
- Display: flex
- Align Items: center
- Gap: 16px
- Margin Bottom: 16px

PROVIDER BOOKING DETAIL CUSTOMER AVATAR:
- Width: 64px
- Height: 64px
- Border Radius: 9999px
- Object Fit: cover
- Border: 2px solid #E5E7EB

PROVIDER BOOKING DETAIL CUSTOMER DETAILS:
- Flex: 1

PROVIDER BOOKING DETAIL CUSTOMER NAME:
- Font Size: 16px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 4px

PROVIDER BOOKING DETAIL CUSTOMER EMAIL:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280
- Margin Bottom: 2px

PROVIDER BOOKING DETAIL CUSTOMER PHONE:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280

PROVIDER BOOKING DETAIL ACTIONS:
- Display: flex
- Gap: 12px
- Margin Top: 24px
- Justify Content: flex-end
- Flex Wrap: wrap

PROVIDER BOOKING DETAIL BUTTON BACK:
- (gunakan SECONDARY BUTTON dari Design System)

PROVIDER BOOKING DETAIL BUTTON CONFIRM:
- (gunakan SUCCESS BUTTON dari Design System)

PROVIDER BOOKING DETAIL BUTTON CANCEL:
- (gunakan DANGER BUTTON dari Design System)

PROVIDER BOOKING DETAIL BUTTON COMPLETE:
- Background: #8B5CF6
- (gunakan PRIMARY BUTTON styling dari Design System)

==================================================
💼 PROVIDER LAYANAN SAYA (MY SERVICES)
==================================================

SERVICES PAGE HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: center
- Margin Bottom: 24px

SERVICES PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827

SERVICES ADD BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)
- Icon: plus
- Icon Size: 16px
- Icon Margin Right: 8px

SERVICES TABLE:
- (gunakan TABLE dari Design System - Tables)

SERVICES TABLE COLUMNS:
1. Layanan (width: auto, min-width: 250px)
2. Kategori (width: 150px)
3. Harga (width: 120px)
4. Status (width: 120px)
5. Aksi (width: 120px)

SERVICES TABLE SERVICE CELL:
- Display: flex
- Align Items: center
- Gap: 12px

SERVICES TABLE SERVICE IMAGE:
- Width: 56px
- Height: 56px
- Border Radius: 8px
- Object Fit: cover

SERVICES TABLE SERVICE INFO:
- Display: flex
- Flex Direction: column
- Gap: 4px

SERVICES TABLE SERVICE NAME:
- Font Size: 14px
- Font Weight: 700
- Text Color: #111827

SERVICES TABLE SERVICE LOCATION:
- Font Size: 12px
- Font Weight: 400
- Text Color: #6B7280
- Display: flex
- Align Items: center
- Gap: 4px
- Icon: map-pin
- Icon Size: 12px

SERVICES TABLE CATEGORY:
- Font Size: 14px
- Font Weight: 500
- Text Color: #6B7280

SERVICES TABLE PRICE:
- Font Size: 14px
- Font Weight: 700
- Text Color: #3B82F6

SERVICES TABLE STATUS:
- (gunakan BADGE ACTIVE/INACTIVE dari Design System - Badges)

SERVICES TABLE ACTIONS:
- Display: flex
- Gap: 6px

SERVICES TABLE ACTION BUTTON VIEW:
- (gunakan ICON BUTTON dari Design System)
- Icon: eye
- Hover Color: #3B82F6

SERVICES TABLE ACTION BUTTON EDIT:
- (gunakan ICON BUTTON dari Design System)
- Icon: pen atau edit
- Hover Color: #F59E0B

SERVICES TABLE ACTION BUTTON DELETE:
- (gunakan ICON BUTTON dari Design System)
- Icon: trash
- Hover Color: #EF4444


==================================================
➕ PROVIDER TAMBAH/EDIT LAYANAN
==================================================

SERVICE FORM PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827
- Margin Bottom: 24px

SERVICE FORM CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 32px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Max Width: 900px

SERVICE FORM:
- Display: flex
- Flex Direction: column
- Gap: 24px

SERVICE FORM IMAGE UPLOAD SECTION:
- Display: flex
- Flex Direction: column
- Gap: 12px

SERVICE FORM IMAGE PREVIEW:
- Width: 100%
- Max Width: 400px
- Height: 250px
- Border Radius: 12px
- Object Fit: cover
- Border: 2px solid #E5E7EB
- Margin Bottom: 12px

SERVICE FORM IMAGE UPLOAD CONTAINER:
- Display: flex
- Flex Direction: column
- Align Items: center
- Justify Content: center
- Padding: 40px 24px
- Background: #F9FAFB
- Border: 2px dashed #D1D5DB
- Border Radius: 12px
- Cursor: pointer
- Hover Border Color: #3B82F6
- Hover Background: #EFF6FF
- Transition: all 0.2s ease

SERVICE FORM IMAGE UPLOAD ICON:
- Width: 64px
- Height: 64px
- Background: #E5E7EB
- Border Radius: 12px
- Display: flex
- Align Items: center
- Justify Content: center
- Margin Bottom: 12px
- Icon: cloud-upload atau image
- Icon Size: 32px
- Icon Color: #9CA3AF

SERVICE FORM IMAGE UPLOAD TEXT:
- Font Size: 14px
- Font Weight: 600
- Text Color: #374151
- Margin Bottom: 4px

SERVICE FORM IMAGE UPLOAD HINT:
- Font Size: 12px
- Font Weight: 400
- Text Color: #9CA3AF

SERVICE FORM IMAGE UPLOAD BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)
- Margin Top: 12px

SERVICE FORM GRID:
- Display: grid
- Grid Template Columns: 1fr 1fr (desktop) atau 1fr (mobile)
- Gap: 20px

SERVICE FORM GROUP:
- Display: flex
- Flex Direction: column
- Gap: 6px

SERVICE FORM LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #374151

SERVICE FORM LABEL REQUIRED:
- Color: #EF4444
- Margin Left: 4px

SERVICE FORM INPUT:
- (gunakan TEXT INPUT dari Design System)

SERVICE FORM SELECT:
- (gunakan SELECT DROPDOWN dari Design System)

SERVICE FORM TEXTAREA:
- (gunakan TEXTAREA dari Design System)
- Min Height: 150px
- Grid Column: 1 / -1 (full width)

SERVICE FORM ACTIONS:
- Display: flex
- Gap: 12px
- Justify Content: flex-end
- Margin Top: 8px
- Grid Column: 1 / -1

SERVICE FORM BUTTON CANCEL:
- (gunakan SECONDARY BUTTON dari Design System)

SERVICE FORM BUTTON SAVE:
- (gunakan PRIMARY BUTTON dari Design System)

==================================================
💰 PROVIDER PENGHASILAN (EARNINGS)
==================================================

EARNINGS PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827
- Margin Bottom: 24px

EARNINGS SUMMARY GRID:
- Display: grid
- Grid Template Columns: repeat(3, 1fr) (desktop) atau 1fr (mobile)
- Gap: 20px
- Margin Bottom: 24px

EARNINGS SUMMARY CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

EARNINGS SUMMARY ICON:
- Width: 48px
- Height: 48px
- Background: linear-gradient(135deg, #10B981 0%, #059669 100%)
- Border Radius: 12px
- Display: flex
- Align Items: center
- Justify Content: center
- Margin Bottom: 16px
- Icon Size: 24px
- Icon Color: #FFFFFF

EARNINGS SUMMARY VALUE:
- Font Size: 32px
- Font Weight: 800
- Text Color: #111827
- Margin Bottom: 8px

EARNINGS SUMMARY LABEL:
- Font Size: 14px
- Font Weight: 500
- Text Color: #6B7280

EARNINGS CHART CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Margin Bottom: 24px

EARNINGS CHART TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 20px

EARNINGS TRANSACTIONS CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

EARNINGS TRANSACTIONS TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 20px

EARNINGS TRANSACTIONS LIST:
- Display: flex
- Flex Direction: column
- Gap: 12px

EARNINGS TRANSACTION ITEM:
- Display: flex
- Justify Content: space-between
- Align Items: center
- Padding: 16px
- Background: #F9FAFB
- Border: 1px solid #E5E7EB
- Border Radius: 8px

EARNINGS TRANSACTION INFO:
- Display: flex
- Flex Direction: column
- Gap: 4px

EARNINGS TRANSACTION SERVICE:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827

EARNINGS TRANSACTION DATE:
- Font Size: 12px
- Font Weight: 400
- Text Color: #6B7280

EARNINGS TRANSACTION AMOUNT:
- Font Size: 16px
- Font Weight: 700
- Text Color: #10B981

==================================================
⭐ PROVIDER ULASAN (REVIEWS)
==================================================

PROVIDER REVIEWS PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827
- Margin Bottom: 24px

PROVIDER REVIEWS SUMMARY CARD:
- Background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%)
- Border: none
- Border Radius: 12px
- Padding: 32px
- Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Margin Bottom: 24px
- Text Align: center

PROVIDER REVIEWS SUMMARY RATING:
- Font Size: 48px
- Font Weight: 800
- Text Color: #FFFFFF
- Margin Bottom: 8px

PROVIDER REVIEWS SUMMARY STARS:
- Display: flex
- Gap: 4px
- Justify Content: center
- Margin Bottom: 12px

PROVIDER REVIEWS SUMMARY STAR:
- Icon: star (filled)
- Icon Size: 24px
- Icon Color: #FFFFFF

PROVIDER REVIEWS SUMMARY COUNT:
- Font Size: 16px
- Font Weight: 500
- Text Color: rgba(255, 255, 255, 0.9)

PROVIDER REVIEWS LIST:
- Display: flex
- Flex Direction: column
- Gap: 16px

PROVIDER REVIEW CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

PROVIDER REVIEW HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: start
- Margin Bottom: 16px

PROVIDER REVIEW CUSTOMER INFO:
- Display: flex
- Align Items: center
- Gap: 12px

PROVIDER REVIEW CUSTOMER AVATAR:
- Width: 48px
- Height: 48px
- Border Radius: 9999px
- Object Fit: cover

PROVIDER REVIEW CUSTOMER DETAILS:
- Display: flex
- Flex Direction: column
- Gap: 4px

PROVIDER REVIEW CUSTOMER NAME:
- Font Size: 16px
- Font Weight: 700
- Text Color: #111827

PROVIDER REVIEW SERVICE NAME:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280

PROVIDER REVIEW RATING:
- Display: flex
- Gap: 4px

PROVIDER REVIEW STAR:
- Icon: star (filled)
- Icon Size: 18px
- Icon Color: #F59E0B

PROVIDER REVIEW COMMENT:
- Font Size: 14px
- Font Weight: 400
- Text Color: #374151
- Line Height: 22px
- Margin Bottom: 12px

PROVIDER REVIEW DATE:
- Font Size: 12px
- Font Weight: 400
- Text Color: #9CA3AF

==================================================
⚙️ PROVIDER PENGATURAN (SETTINGS)
==================================================

(Gunakan layout dan styling yang sama dengan CUSTOMER SETTINGS)

==================================================
👨‍💼 ADMIN DASHBOARD
==================================================

ADMIN SIDEBAR MENU ITEMS:
1. Dashboard (icon: grid atau dashboard)
2. Manage Users (icon: users)
3. Manage Services (icon: briefcase)
4. Manage Bookings (icon: calendar-check)
5. Kategori (icon: folder atau tags)
6. Laporan (icon: chart-bar atau file-text)
7. Settings (icon: cog)
8. Back to Home (icon: home)
9. Logout (icon: sign-out)

ADMIN DASHBOARD WELCOME CARD:
- Background: linear-gradient(135deg, #1F2937 0%, #111827 100%)
- Border: none
- Border Radius: 16px
- Padding: 32px
- Margin Bottom: 24px
- Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)

ADMIN DASHBOARD WELCOME BADGE:
- Display: inline-flex
- Align Items: center
- Padding: 6px 12px
- Background: rgba(239, 68, 68, 0.2)
- Border: 1px solid rgba(239, 68, 68, 0.3)
- Border Radius: 9999px
- Font Size: 12px
- Font Weight: 700
- Text Color: #FEE2E2
- Margin Bottom: 12px

ADMIN DASHBOARD WELCOME TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #FFFFFF
- Margin Bottom: 8px

ADMIN DASHBOARD WELCOME SUBTITLE:
- Font Size: 16px
- Font Weight: 400
- Text Color: rgba(255, 255, 255, 0.8)

ADMIN DASHBOARD STATS GRID:
- Display: grid
- Grid Template Columns: repeat(4, 1fr) (desktop) atau repeat(2, 1fr) (mobile)
- Gap: 20px
- Margin Bottom: 24px

ADMIN STAT CARD 1 (Total Users):
- Background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)
- Icon: users

ADMIN STAT CARD 2 (Total Services):
- Background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)
- Icon: briefcase

ADMIN STAT CARD 3 (Total Bookings):
- Background: linear-gradient(135deg, #10B981 0%, #059669 100%)
- Icon: calendar-check

ADMIN STAT CARD 4 (Total Revenue):
- Background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%)
- Icon: dollar-sign

(Gunakan STAT CARD styling dari Design System - Cards)

ADMIN DASHBOARD CHARTS GRID:
- Display: grid
- Grid Template Columns: 2fr 1fr (desktop) atau 1fr (mobile)
- Gap: 24px
- Margin Bottom: 24px

ADMIN DASHBOARD CHART CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

ADMIN DASHBOARD CHART TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 20px

ADMIN DASHBOARD RECENT ACTIVITIES:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Margin Bottom: 24px

ADMIN DASHBOARD ACTIVITIES TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 20px

ADMIN DASHBOARD ACTIVITY ITEM:
- Display: flex
- Align Items: start
- Gap: 12px
- Padding: 12px 0
- Border Bottom: 1px solid #F3F4F6

ADMIN DASHBOARD ACTIVITY ITEM:last-child:
- Border Bottom: none

ADMIN DASHBOARD ACTIVITY ICON:
- Width: 36px
- Height: 36px
- Background: #EFF6FF
- Border Radius: 8px
- Display: flex
- Align Items: center
- Justify Content: center
- Flex Shrink: 0
- Icon Size: 18px
- Icon Color: #3B82F6

ADMIN DASHBOARD ACTIVITY CONTENT:
- Flex: 1

ADMIN DASHBOARD ACTIVITY TEXT:
- Font Size: 14px
- Font Weight: 500
- Text Color: #374151
- Margin Bottom: 4px

ADMIN DASHBOARD ACTIVITY TIME:
- Font Size: 12px
- Font Weight: 400
- Text Color: #9CA3AF

ADMIN DASHBOARD QUICK ACTIONS:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

ADMIN DASHBOARD QUICK ACTIONS TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 20px

ADMIN DASHBOARD QUICK ACTIONS GRID:
- Display: grid
- Grid Template Columns: repeat(2, 1fr) (desktop) atau 1fr (mobile)
- Gap: 12px

ADMIN DASHBOARD QUICK ACTION BUTTON:
- Display: flex
- Align Items: center
- Gap: 12px
- Padding: 16px
- Background: #F9FAFB
- Border: 1px solid #E5E7EB
- Border Radius: 8px
- Text Decoration: none
- Hover Background: #EFF6FF
- Hover Border Color: #3B82F6
- Transition: all 0.2s ease

ADMIN DASHBOARD QUICK ACTION ICON:
- Width: 40px
- Height: 40px
- Background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)
- Border Radius: 8px
- Display: flex
- Align Items: center
- Justify Content: center
- Icon Size: 20px
- Icon Color: #FFFFFF

ADMIN DASHBOARD QUICK ACTION TEXT:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827


==================================================
👥 ADMIN MANAGE USERS
==================================================

ADMIN USERS PAGE HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: center
- Margin Bottom: 24px

ADMIN USERS PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827

ADMIN USERS ADD BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)
- Icon: user-plus
- Icon Size: 16px
- Icon Margin Right: 8px

ADMIN USERS FILTER SECTION:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 20px
- Margin Bottom: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Display: flex
- Gap: 12px
- Align Items: end

ADMIN USERS SEARCH INPUT:
- Flex: 1
- (gunakan TEXT INPUT dari Design System)

ADMIN USERS ROLE FILTER:
- Width: 200px
- (gunakan SELECT DROPDOWN dari Design System)

ADMIN USERS FILTER BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)

ADMIN USERS TABLE:
- (gunakan TABLE dari Design System - Tables)

ADMIN USERS TABLE COLUMNS:
1. User (width: auto, min-width: 250px)
2. Role (width: 120px)
3. Status (width: 120px)
4. Phone (width: 150px)
5. Actions (width: 120px)

ADMIN USERS TABLE USER CELL:
- Display: flex
- Align Items: center
- Gap: 12px

ADMIN USERS TABLE USER AVATAR:
- Width: 40px
- Height: 40px
- Border Radius: 9999px
- Object Fit: cover
- Border: 2px solid #E5E7EB

ADMIN USERS TABLE USER INFO:
- Display: flex
- Flex Direction: column
- Gap: 2px

ADMIN USERS TABLE USER NAME:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827

ADMIN USERS TABLE USER EMAIL:
- Font Size: 12px
- Font Weight: 400
- Text Color: #6B7280

ADMIN USERS TABLE ROLE BADGE:
- Display: inline-flex
- Padding: 4px 10px
- Border Radius: 6px
- Font Size: 12px
- Font Weight: 600

ADMIN USERS TABLE ROLE ADMIN:
- Background: #FEE2E2
- Text Color: #991B1B
- Border: 1px solid #FECACA

ADMIN USERS TABLE ROLE PROVIDER:
- Background: #E9D5FF
- Text Color: #6B21A8
- Border: 1px solid #DDD6FE

ADMIN USERS TABLE ROLE CUSTOMER:
- Background: #DBEAFE
- Text Color: #1E40AF
- Border: 1px solid #BFDBFE

ADMIN USERS TABLE STATUS:
- (gunakan BADGE ACTIVE/INACTIVE dari Design System - Badges)

ADMIN USERS TABLE ACTIONS:
- Display: flex
- Gap: 6px

ADMIN USERS TABLE ACTION BUTTON VIEW:
- (gunakan ICON BUTTON dari Design System)
- Icon: eye
- Hover Color: #3B82F6

ADMIN USERS TABLE ACTION BUTTON EDIT:
- (gunakan ICON BUTTON dari Design System)
- Icon: pen atau edit
- Hover Color: #F59E0B

ADMIN USERS TABLE ACTION BUTTON DELETE:
- (gunakan ICON BUTTON dari Design System)
- Icon: trash
- Hover Color: #EF4444

==================================================
👤 ADMIN USER DETAIL/ADD/EDIT
==================================================

ADMIN USER FORM PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827
- Margin Bottom: 24px

ADMIN USER FORM CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 32px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Max Width: 900px

ADMIN USER FORM:
- Display: flex
- Flex Direction: column
- Gap: 24px

ADMIN USER FORM PROFILE SECTION:
- (gunakan SETTINGS PROFILE PHOTO SECTION dari Customer Settings)

ADMIN USER FORM GRID:
- Display: grid
- Grid Template Columns: 1fr 1fr (desktop) atau 1fr (mobile)
- Gap: 20px

ADMIN USER FORM GROUP:
- Display: flex
- Flex Direction: column
- Gap: 6px

ADMIN USER FORM LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #374151

ADMIN USER FORM INPUT:
- (gunakan TEXT INPUT dari Design System)

ADMIN USER FORM SELECT:
- (gunakan SELECT DROPDOWN dari Design System)

ADMIN USER FORM TEXTAREA:
- (gunakan TEXTAREA dari Design System)
- Grid Column: 1 / -1

ADMIN USER FORM ACTIONS:
- Display: flex
- Gap: 12px
- Justify Content: flex-end
- Margin Top: 8px

ADMIN USER FORM BUTTON CANCEL:
- (gunakan SECONDARY BUTTON dari Design System)

ADMIN USER FORM BUTTON SAVE:
- (gunakan PRIMARY BUTTON dari Design System)

==================================================
💼 ADMIN MANAGE SERVICES
==================================================

ADMIN SERVICES PAGE HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: center
- Margin Bottom: 24px

ADMIN SERVICES PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827

ADMIN SERVICES ADD BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)
- Icon: plus
- Icon Size: 16px
- Icon Margin Right: 8px

ADMIN SERVICES FILTER SECTION:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 20px
- Margin Bottom: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Display: flex
- Gap: 12px
- Align Items: end

ADMIN SERVICES SEARCH INPUT:
- Flex: 1
- (gunakan TEXT INPUT dari Design System)

ADMIN SERVICES CATEGORY FILTER:
- Width: 200px
- (gunakan SELECT DROPDOWN dari Design System)

ADMIN SERVICES STATUS FILTER:
- Width: 150px
- (gunakan SELECT DROPDOWN dari Design System)

ADMIN SERVICES FILTER BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)

ADMIN SERVICES TABLE:
- (gunakan TABLE dari Design System - Tables)

ADMIN SERVICES TABLE COLUMNS:
1. Service (width: auto, min-width: 250px)
2. Provider (width: 180px)
3. Price (width: 120px)
4. Status (width: 120px)
5. Actions (width: 120px)

ADMIN SERVICES TABLE SERVICE CELL:
- (gunakan SERVICES TABLE SERVICE CELL dari Provider Layanan Saya)

ADMIN SERVICES TABLE PROVIDER CELL:
- Display: flex
- Align Items: center
- Gap: 10px

ADMIN SERVICES TABLE PROVIDER AVATAR:
- Width: 32px
- Height: 32px
- Border Radius: 9999px
- Object Fit: cover

ADMIN SERVICES TABLE PROVIDER NAME:
- Font Size: 14px
- Font Weight: 500
- Text Color: #111827

ADMIN SERVICES TABLE PRICE:
- Font Size: 14px
- Font Weight: 700
- Text Color: #3B82F6

ADMIN SERVICES TABLE STATUS:
- (gunakan BADGE ACTIVE/INACTIVE dari Design System - Badges)

ADMIN SERVICES TABLE ACTIONS:
- Display: flex
- Gap: 6px

ADMIN SERVICES TABLE ACTION BUTTON VIEW:
- (gunakan ICON BUTTON dari Design System)
- Icon: eye
- Hover Color: #3B82F6

ADMIN SERVICES TABLE ACTION BUTTON EDIT:
- (gunakan ICON BUTTON dari Design System)
- Icon: pen atau edit
- Hover Color: #F59E0B

ADMIN SERVICES TABLE ACTION BUTTON DELETE:
- (gunakan ICON BUTTON dari Design System)
- Icon: trash
- Hover Color: #EF4444

==================================================
📝 ADMIN SERVICE DETAIL/ADD/EDIT
==================================================

(Gunakan layout dan styling yang sama dengan PROVIDER TAMBAH/EDIT LAYANAN)

ADMIN SERVICE FORM PROVIDER SELECT:
- (tambahkan field ini di bagian atas form)
- Label: "Provider"
- (gunakan SELECT DROPDOWN dari Design System)
- Grid Column: 1 / -1

==================================================
📅 ADMIN MANAGE BOOKINGS
==================================================

ADMIN BOOKINGS PAGE HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: center
- Margin Bottom: 24px

ADMIN BOOKINGS PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827

ADMIN BOOKINGS FILTER SECTION:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 20px
- Margin Bottom: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Display: flex
- Gap: 12px
- Align Items: end
- Flex Wrap: wrap

ADMIN BOOKINGS SEARCH INPUT:
- Flex: 1
- Min Width: 250px
- (gunakan TEXT INPUT dari Design System)

ADMIN BOOKINGS STATUS FILTER:
- Width: 180px
- (gunakan SELECT DROPDOWN dari Design System)

ADMIN BOOKINGS DATE FILTER:
- Width: 180px
- (gunakan TEXT INPUT dari Design System)
- Type: date

ADMIN BOOKINGS FILTER BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)

ADMIN BOOKINGS TABLE:
- (gunakan TABLE dari Design System - Tables)

ADMIN BOOKINGS TABLE COLUMNS:
1. ID (width: 80px)
2. Customer (width: 160px)
3. Provider (width: 160px)
4. Layanan (width: auto, min-width: 180px)
5. Tanggal & Waktu (width: 160px)
6. Harga (width: 100px)
7. Status (width: 120px)
8. Aksi (width: 100px)

ADMIN BOOKINGS TABLE CUSTOMER CELL:
- (gunakan PROVIDER BOOKINGS TABLE CUSTOMER CELL dari Provider Bookings)

ADMIN BOOKINGS TABLE PROVIDER CELL:
- (gunakan PROVIDER BOOKINGS TABLE CUSTOMER CELL styling)

ADMIN BOOKINGS TABLE SERVICE CELL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827

ADMIN BOOKINGS TABLE PRICE:
- Font Size: 14px
- Font Weight: 700
- Text Color: #3B82F6

ADMIN BOOKINGS TABLE STATUS:
- (gunakan BADGE dari Design System - Badges)

ADMIN BOOKINGS TABLE ACTIONS:
- Display: flex
- Gap: 6px

ADMIN BOOKINGS TABLE ACTION BUTTON VIEW:
- (gunakan ICON BUTTON dari Design System)
- Icon: eye
- Hover Color: #3B82F6

ADMIN BOOKINGS TABLE ACTION BUTTON EDIT:
- (gunakan ICON BUTTON dari Design System)
- Icon: pen atau edit
- Hover Color: #F59E0B

==================================================
📋 ADMIN BOOKING DETAIL/EDIT
==================================================

ADMIN BOOKING DETAIL CONTAINER:
- Max Width: 1200px
- Margin: 0 auto

ADMIN BOOKING DETAIL HEADER:
- (gunakan BOOKING DETAIL HEADER dari Customer Booking Detail)

ADMIN BOOKING DETAIL GRID:
- Display: grid
- Grid Template Columns: 1fr 1fr 1fr (desktop) atau 1fr (mobile)
- Gap: 24px

ADMIN BOOKING DETAIL CARD:
- (gunakan BOOKING DETAIL CARD dari Customer Booking Detail)

ADMIN BOOKING DETAIL CUSTOMER CARD:
- (gunakan PROVIDER BOOKING DETAIL CUSTOMER CARD dari Provider Booking Detail)

ADMIN BOOKING DETAIL PROVIDER CARD:
- (sama dengan CUSTOMER CARD, tapi untuk provider)

ADMIN BOOKING DETAIL SERVICE CARD:
- (gunakan BOOKING DETAIL CARD dari Customer Booking Detail)

ADMIN BOOKING DETAIL ACTIONS:
- Display: flex
- Gap: 12px
- Margin Top: 24px
- Justify Content: flex-end
- Grid Column: 1 / -1

ADMIN BOOKING DETAIL BUTTON BACK:
- (gunakan SECONDARY BUTTON dari Design System)

ADMIN BOOKING DETAIL BUTTON EDIT:
- (gunakan WARNING BUTTON dari Design System)

ADMIN BOOKING DETAIL BUTTON CONFIRM:
- (gunakan SUCCESS BUTTON dari Design System)

ADMIN BOOKING DETAIL BUTTON CANCEL:
- (gunakan DANGER BUTTON dari Design System)

==================================================
🏷️ ADMIN KATEGORI
==================================================

ADMIN CATEGORIES PAGE HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: center
- Margin Bottom: 24px

ADMIN CATEGORIES PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827

ADMIN CATEGORIES ADD BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)
- Icon: plus
- Icon Size: 16px
- Icon Margin Right: 8px

ADMIN CATEGORIES SEARCH SECTION:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 20px
- Margin Bottom: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Display: flex
- Gap: 12px
- Align Items: end

ADMIN CATEGORIES SEARCH INPUT:
- Flex: 1
- (gunakan TEXT INPUT dari Design System)

ADMIN CATEGORIES SEARCH BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)

ADMIN CATEGORIES TABLE:
- (gunakan TABLE dari Design System - Tables)

ADMIN CATEGORIES TABLE COLUMNS:
1. ID (width: 80px)
2. Nama Kategori (width: auto, min-width: 200px)
3. Deskripsi (width: auto, min-width: 300px)
4. Jumlah Service (width: 150px)
5. Dibuat (width: 150px)
6. Aksi (width: 100px)

ADMIN CATEGORIES TABLE NAME CELL:
- Display: flex
- Align Items: center
- Gap: 12px

ADMIN CATEGORIES TABLE ICON:
- Width: 40px
- Height: 40px
- Background: linear-gradient(135deg, #EFF6FF 0%, #E9D5FF 100%)
- Border Radius: 8px
- Display: flex
- Align Items: center
- Justify Content: center
- Icon Size: 20px
- Icon Color: #3B82F6

ADMIN CATEGORIES TABLE NAME:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827

ADMIN CATEGORIES TABLE DESCRIPTION:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280
- Max Width: 400px
- Overflow: hidden
- Text Overflow: ellipsis
- White Space: nowrap

ADMIN CATEGORIES TABLE SERVICE COUNT:
- Display: inline-flex
- Align Items: center
- Justify Content: center
- Padding: 4px 12px
- Background: #EFF6FF
- Border: 1px solid #BFDBFE
- Border Radius: 9999px
- Font Size: 12px
- Font Weight: 700
- Text Color: #1E40AF

ADMIN CATEGORIES TABLE DATE:
- Font Size: 14px
- Font Weight: 400
- Text Color: #6B7280

ADMIN CATEGORIES TABLE ACTIONS:
- Display: flex
- Gap: 6px

ADMIN CATEGORIES TABLE ACTION BUTTON EDIT:
- (gunakan ICON BUTTON dari Design System)
- Icon: pen atau edit
- Hover Color: #F59E0B

ADMIN CATEGORIES TABLE ACTION BUTTON DELETE:
- (gunakan ICON BUTTON dari Design System)
- Icon: trash
- Hover Color: #EF4444
- Disabled jika service_count > 0

ADMIN CATEGORIES TABLE ACTION BUTTON LOCKED:
- (gunakan ICON BUTTON dari Design System)
- Icon: lock
- Color: #9CA3AF
- Cursor: not-allowed
- Tooltip: "Tidak dapat dihapus karena masih memiliki layanan"


==================================================
➕ ADMIN CATEGORY ADD/EDIT
==================================================

ADMIN CATEGORY FORM PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827
- Margin Bottom: 24px

ADMIN CATEGORY FORM CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 32px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Max Width: 700px

ADMIN CATEGORY FORM:
- Display: flex
- Flex Direction: column
- Gap: 20px

ADMIN CATEGORY FORM GROUP:
- Display: flex
- Flex Direction: column
- Gap: 6px

ADMIN CATEGORY FORM LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #374151

ADMIN CATEGORY FORM INPUT:
- (gunakan TEXT INPUT dari Design System)

ADMIN CATEGORY FORM TEXTAREA:
- (gunakan TEXTAREA dari Design System)
- Min Height: 120px

ADMIN CATEGORY FORM ACTIONS:
- Display: flex
- Gap: 12px
- Justify Content: flex-end
- Margin Top: 8px

ADMIN CATEGORY FORM BUTTON CANCEL:
- (gunakan SECONDARY BUTTON dari Design System)

ADMIN CATEGORY FORM BUTTON SAVE:
- (gunakan PRIMARY BUTTON dari Design System)

==================================================
📊 ADMIN LAPORAN (REPORTS)
==================================================

ADMIN REPORTS PAGE TITLE:
- Font Size: 28px
- Font Weight: 800
- Text Color: #111827
- Margin Bottom: 24px

ADMIN REPORTS FILTER CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Margin Bottom: 24px

ADMIN REPORTS FILTER TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 16px

ADMIN REPORTS FILTER FORM:
- Display: grid
- Grid Template Columns: 1fr 1fr 1fr auto (desktop) atau 1fr (mobile)
- Gap: 12px
- Align Items: end

ADMIN REPORTS FILTER GROUP:
- Display: flex
- Flex Direction: column
- Gap: 6px

ADMIN REPORTS FILTER LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #374151

ADMIN REPORTS FILTER INPUT:
- (gunakan TEXT INPUT dari Design System)
- Type: date

ADMIN REPORTS FILTER SELECT:
- (gunakan SELECT DROPDOWN dari Design System)

ADMIN REPORTS FILTER BUTTON:
- (gunakan PRIMARY BUTTON dari Design System)

ADMIN REPORTS EXPORT BUTTON:
- (gunakan SUCCESS BUTTON dari Design System)
- Icon: download
- Icon Size: 16px
- Icon Margin Right: 8px

ADMIN REPORTS SUMMARY GRID:
- Display: grid
- Grid Template Columns: repeat(4, 1fr) (desktop) atau repeat(2, 1fr) (mobile)
- Gap: 20px
- Margin Bottom: 24px

ADMIN REPORTS SUMMARY CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

ADMIN REPORTS SUMMARY HEADER:
- Display: flex
- Justify Content: space-between
- Align Items: start
- Margin Bottom: 16px

ADMIN REPORTS SUMMARY ICON:
- Width: 48px
- Height: 48px
- Background: linear-gradient(135deg, #EFF6FF 0%, #E9D5FF 100%)
- Border Radius: 12px
- Display: flex
- Align Items: center
- Justify Content: center
- Icon Size: 24px
- Icon Color: #3B82F6

ADMIN REPORTS SUMMARY VALUE:
- Font Size: 32px
- Font Weight: 800
- Text Color: #111827
- Margin Bottom: 8px

ADMIN REPORTS SUMMARY LABEL:
- Font Size: 14px
- Font Weight: 500
- Text Color: #6B7280

ADMIN REPORTS SUMMARY CHANGE:
- Display: flex
- Align Items: center
- Gap: 4px
- Font Size: 12px
- Font Weight: 600

ADMIN REPORTS SUMMARY CHANGE POSITIVE:
- Text Color: #10B981
- Icon: arrow-up atau trending-up
- Icon Size: 14px

ADMIN REPORTS SUMMARY CHANGE NEGATIVE:
- Text Color: #EF4444
- Icon: arrow-down atau trending-down
- Icon Size: 14px

ADMIN REPORTS CHARTS GRID:
- Display: grid
- Grid Template Columns: 2fr 1fr (desktop) atau 1fr (mobile)
- Gap: 24px
- Margin Bottom: 24px

ADMIN REPORTS CHART CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

ADMIN REPORTS CHART TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 20px

ADMIN REPORTS TABLE CARD:
- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 12px
- Padding: 24px
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

ADMIN REPORTS TABLE TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 20px

ADMIN REPORTS TABLE:
- (gunakan TABLE dari Design System - Tables)

==================================================
⚙️ ADMIN SETTINGS
==================================================

(Gunakan layout dan styling yang sama dengan CUSTOMER SETTINGS)

ADMIN SETTINGS ADDITIONAL SECTION:
- Padding Top: 24px
- Margin Top: 24px
- Border Top: 1px solid #E5E7EB

ADMIN SETTINGS SECTION TITLE:
- Font Size: 18px
- Font Weight: 700
- Text Color: #111827
- Margin Bottom: 16px

ADMIN SETTINGS SYSTEM SETTINGS:
- Display: flex
- Flex Direction: column
- Gap: 16px

ADMIN SETTINGS SYSTEM ITEM:
- Display: flex
- Justify Content: space-between
- Align Items: center
- Padding: 16px
- Background: #F9FAFB
- Border: 1px solid #E5E7EB
- Border Radius: 8px

ADMIN SETTINGS SYSTEM ITEM INFO:
- Display: flex
- Flex Direction: column
- Gap: 4px

ADMIN SETTINGS SYSTEM ITEM LABEL:
- Font Size: 14px
- Font Weight: 600
- Text Color: #111827

ADMIN SETTINGS SYSTEM ITEM DESCRIPTION:
- Font Size: 12px
- Font Weight: 400
- Text Color: #6B7280

ADMIN SETTINGS SYSTEM ITEM TOGGLE:
- Width: 48px
- Height: 24px
- Background: #D1D5DB (off) atau #3B82F6 (on)
- Border Radius: 9999px
- Position: relative
- Cursor: pointer
- Transition: all 0.2s ease

ADMIN SETTINGS SYSTEM ITEM TOGGLE CIRCLE:
- Width: 20px
- Height: 20px
- Background: #FFFFFF
- Border Radius: 9999px
- Position: absolute
- Top: 2px
- Left: 2px (off) atau 26px (on)
- Transition: all 0.2s ease
- Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)

==================================================
🎨 MODAL KONFIRMASI CUSTOM (WAJIB)
==================================================

SEMUA AKSI BERISIKO HARUS MENGGUNAKAN MODAL CUSTOM INI:
- Delete service
- Delete user
- Delete kategori
- Batalkan booking
- Konfirmasi booking
- Selesaikan booking

(Gunakan MODAL dari Design System - Modals)

CONTOH MODAL DELETE:
- Icon: exclamation-triangle (warning)
- Icon Background: #FEF3C7
- Icon Color: #F59E0B
- Title: "Konfirmasi Hapus"
- Message: "Apakah Anda yakin ingin menghapus [item]? Tindakan ini tidak dapat dibatalkan."
- Cancel Button: "Batal"
- Confirm Button: "Ya, Hapus" (background #EF4444)

CONTOH MODAL CONFIRM BOOKING:
- Icon: check-circle (info)
- Icon Background: #DBEAFE
- Icon Color: #3B82F6
- Title: "Konfirmasi Booking"
- Message: "Apakah Anda yakin ingin mengonfirmasi booking ini?"
- Cancel Button: "Batal"
- Confirm Button: "Ya, Konfirmasi" (background #10B981)

CONTOH MODAL CANCEL BOOKING:
- Icon: x-circle (warning)
- Icon Background: #FEE2E2
- Icon Color: #EF4444
- Title: "Batalkan Booking"
- Message: "Apakah Anda yakin ingin membatalkan booking ini?"
- Cancel Button: "Tidak"
- Confirm Button: "Ya, Batalkan" (background #EF4444)

CONTOH MODAL COMPLETE BOOKING:
- Icon: check-double (success)
- Icon Background: #E9D5FF
- Icon Color: #8B5CF6
- Title: "Selesaikan Booking"
- Message: "Apakah Anda yakin booking ini sudah selesai?"
- Cancel Button: "Belum"
- Confirm Button: "Ya, Selesai" (background #8B5CF6)

==================================================
📤 INPUT FILE UPLOAD STYLED (WAJIB)
==================================================

JANGAN GUNAKAN INPUT FILE DEFAULT BROWSER.
HARUS MENGGUNAKAN STYLED INPUT FILE.

(Gunakan FILE INPUT STYLED dari Design System - Form Inputs)

CONTOH IMPLEMENTASI UPLOAD FOTO PROFIL:
- Container dengan border dashed
- Icon cloud-upload atau image di tengah
- Text "Pilih Foto Profil"
- Hint "JPG, PNG atau GIF (Max. 2MB)"
- Button "Pilih File" biru
- Preview image jika sudah dipilih

CONTOH IMPLEMENTASI UPLOAD GAMBAR LAYANAN:
- Container dengan border dashed
- Icon image atau picture di tengah
- Text "Upload Gambar Layanan"
- Hint "JPG atau PNG (Max. 5MB)"
- Button "Pilih Gambar" biru
- Preview image jika sudah dipilih

==================================================
📱 RESPONSIVE DESIGN RULES
==================================================

BREAKPOINTS:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

MOBILE ADAPTATIONS:
- Sidebar menjadi drawer (slide from left)
- Hamburger button floating di kanan bawah
- Grid columns menjadi 1 kolom
- Table menjadi scrollable horizontal atau card layout
- Font sizes dikurangi 10-20%
- Padding dikurangi 20-30%
- Stack buttons vertically
- Hide non-essential columns in tables

TABLET ADAPTATIONS:
- Sidebar tetap visible tapi bisa di-toggle
- Grid columns menjadi 2 kolom
- Font sizes normal
- Padding normal

DESKTOP:
- Full layout dengan sidebar fixed
- Grid columns sesuai spesifikasi
- All features visible

==================================================
🎯 ICON REFERENCE (FONT AWESOME STYLE)
==================================================

NAVIGATION:
- home, house
- search, magnifying-glass
- bell, notification
- user, user-circle
- cog, gear, settings
- sign-out, logout
- bars, menu (hamburger)

ACTIONS:
- plus, add
- pen, edit, pencil
- trash, delete
- eye, view
- check, checkmark
- x, times, close
- arrow-left, arrow-right
- arrow-up, arrow-down
- chevron-up, chevron-down, chevron-left, chevron-right

BUSINESS:
- calendar, calendar-check
- briefcase, service
- dollar-sign, money
- star, rating
- users, people
- grid, dashboard
- chart-bar, analytics
- folder, tags

COMMUNICATION:
- envelope, mail
- phone, telephone
- map-pin, location
- clock, time

STATUS:
- check-circle, success
- x-circle, error
- exclamation-circle, warning
- info-circle, information
- lock, locked
- shield-check, verified

MEDIA:
- image, picture
- cloud-upload, upload
- download
- file, document

==================================================
✅ CHECKLIST OUTPUT YANG HARUS DIBUAT
==================================================

HALAMAN PUBLIK:
✅ Header / Navbar (sticky, responsive)
✅ Footer (dark, dengan back-to-top button)
✅ Beranda (hero, kategori, cara kerja, layanan unggulan, testimoni, CTA)
✅ Cari Jasa (filter, grid layanan, empty state)
✅ Detail Layanan (gambar, info, provider, booking form, reviews)
✅ Login (card centered, form, alerts)
✅ Register (role selection, form lengkap)
✅ Forgot Password (card centered, icon, form)
✅ Reset Password (card centered, requirements, form)

CUSTOMER DASHBOARD:
✅ Dashboard (welcome card, stats, quick actions)
✅ Booking Saya (table dengan filter, actions)
✅ Booking Detail (info lengkap, actions)
✅ Review Saya (list reviews, form review)
✅ Pengaturan (profile photo upload, form lengkap)

PROVIDER DASHBOARD:
✅ Dashboard (welcome card, stats, quick actions)
✅ Bookings (table dengan filter, actions lengkap)
✅ Booking Detail (customer info, actions)
✅ Layanan Saya (table, add button)
✅ Tambah/Edit Layanan (form lengkap dengan image upload)
✅ Penghasilan (summary cards, chart, transactions)
✅ Ulasan (summary rating, list reviews)
✅ Pengaturan (sama dengan customer)

ADMIN DASHBOARD:
✅ Dashboard (welcome dengan badge admin, stats, charts, activities, quick actions)
✅ Manage Users (table, filter, add/edit/delete)
✅ User Detail/Add/Edit (form lengkap)
✅ Manage Services (table, filter, add/edit/delete)
✅ Service Detail/Add/Edit (form lengkap dengan provider select)
✅ Manage Bookings (table, filter, detail/edit)
✅ Booking Detail/Edit (info lengkap semua pihak)
✅ Kategori (table, add/edit/delete dengan lock)
✅ Category Add/Edit (form simple)
✅ Laporan (filter, summary cards, charts, export)
✅ Settings (form lengkap dengan system settings)

KOMPONEN WAJIB:
✅ Modal konfirmasi custom (bukan alert browser)
✅ Input file upload styled (bukan default browser)
✅ Sidebar sticky (tidak scroll dengan konten)
✅ Badge status (pill shaped dengan warna sesuai)
✅ Icon buttons (untuk actions di table)
✅ Responsive layout (mobile, tablet, desktop)

==================================================
🚀 PENUTUP
==================================================

INGAT:
1. SEMUA spesifikasi warna, ukuran, spacing, font HARUS diikuti PERSIS
2. SEMUA halaman yang disebutkan HARUS dibuat
3. SEMUA menu yang disebutkan HARUS ada
4. TIDAK BOLEH ada perubahan desain atau konsep baru
5. Modal konfirmasi HARUS custom, BUKAN alert browser
6. Input file upload HARUS styled, BUKAN default browser
7. Sidebar HARUS sticky (tidak scroll dengan konten)
8. Layout HARUS responsive untuk mobile, tablet, dan desktop
9. Semua teks HARUS terlihat utuh (tidak terpotong)
10. Ikuti SEMUA detail yang sudah dijelaskan di atas

Hasil akhir harus 100% sama dengan spesifikasi ini.
Tidak boleh ada interpretasi atau kreativitas tambahan.
Ikuti spesifikasi dengan SANGAT DETAIL dan TELITI.

SELAMAT MEMBUAT UI JASAKU! 🎉
```
