let currentStep = 1;
let guestCount = 0;

/* =======================
   عرض / إخفاء الرسائل
======================= */
function showMessage(message, type = "error") {
    const msgDiv = document.getElementById("formMessage");
    msgDiv.textContent = message;
    msgDiv.className = type === "error" ? "message error" : "message success";
    msgDiv.style.display = "block";
}
function hideMessage() {
    document.getElementById("formMessage").style.display = "none";
}

/* =======================
   تحديث الخطوات
======================= */
function updateSteps() {
    hideMessage();
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.toggle('active', stepNum === currentStep);
    });
    document.querySelectorAll('.form-section').forEach(section => {
        const sectionNum = parseInt(section.dataset.section);
        section.classList.toggle('active', sectionNum === currentStep);
    });
}

/* =======================
   الخطوة التالية
======================= */
function nextStep() {
    hideMessage();

    if (currentStep === 1) {
        const hotelName = document.getElementById('hotelName').value;
        if (!hotelName) {
            showMessage("يرجى اختيار اسم الفندق أولاً.");
            return;
        }
    }

    if (currentStep === 2) {
        const requiredFields = [
            'checkInDate',
            'checkOutDate',
            'checkInTime',
            'checkOutTime',
            'numRooms',
            'numPeople'
        ];

        for (const id of requiredFields) {
            if (!document.getElementById(id).value) {
                showMessage("يرجى ملء جميع الحقول المطلوبة في هذه الخطوة.");
                return;
            }
        }

        const checkIn = new Date(
            document.getElementById('checkInDate').value + "T" +
            document.getElementById('checkInTime').value
        );
        const checkOut = new Date(
            document.getElementById('checkOutDate').value + "T" +
            document.getElementById('checkOutTime').value
        );

        if (checkOut <= checkIn) {
            showMessage("تاريخ ووقت تسجيل الخروج يجب أن يكون بعد تسجيل الدخول.");
            return;
        }
    }

    if (currentStep < 3) {
        currentStep++;
        updateSteps();
    }
}

/* =======================
   الرجوع للخلف
======================= */
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateSteps();
    }
}

/* =======================
   النزلاء
======================= */
function addGuest() {
    guestCount++;

    const container = document.getElementById('guestsContainer');
    const guestCard = document.createElement('div');

    guestCard.className = 'guest-card';
    guestCard.id = `guest-${guestCount}`;

    guestCard.innerHTML = `
        <div class="guest-header">
            <h3>النزيل ${guestCount}</h3>
            <button type="button" class="btn btn-danger" onclick="removeGuest(${guestCount})">
                حذف النزيل
            </button>
        </div>

        <label>الاسم الكامل *</label>
        <input type="text" id="guestName-${guestCount}">

        <label>البريد الإلكتروني *</label>
        <input type="email" id="guestEmail-${guestCount}">

        <label>رقم الهاتف *</label>
        <input type="tel" id="guestPhone-${guestCount}">

        <label>العنوان</label>
        <input type="text" id="guestAddress-${guestCount}">
    `;

    container.appendChild(guestCard);
}

function removeGuest(id) {
    const guest = document.getElementById(`guest-${id}`);
    if (guest) guest.remove();
}

/* =======================
   إرسال الفورم
======================= */
document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();
    hideMessage();

    const hotelName = document.getElementById('hotelName').value;
    if (!hotelName) {
        showMessage("يرجى اختيار اسم الفندق أولاً.");
        currentStep = 1;
        updateSteps();
        return;
    }

    const guests = [];

    for (let i = 1; i <= guestCount; i++) {
        const card = document.getElementById(`guest-${i}`);
        if (!card) continue;

        const name = document.getElementById(`guestName-${i}`).value.trim();
        const email = document.getElementById(`guestEmail-${i}`).value.trim();
        const phone = document.getElementById(`guestPhone-${i}`).value.trim();

        if (!name || !email || !phone) {
            showMessage("يرجى استكمال بيانات جميع النزلاء.");
            return;
        }

        if (!/^\d{11}$/.test(phone)) {
            showMessage("رقم الهاتف يجب أن يكون 11 رقم بالضبط.");
            return;
        }

        guests.push({
            name,
            email,
            phone,
            address: document.getElementById(`guestAddress-${i}`).value.trim()
        });
    }

    const bookingData = {
        hotelName,
        checkInDate: checkInDate.value,
        checkOutDate: checkOutDate.value,
        checkInTime: checkInTime.value,
        checkOutTime: checkOutTime.value,
        numRooms: numRooms.value,
        numPeople: numPeople.value,
        guests
    };

    /* 🔥 إرسال البيانات للـ Backend */
    fetch("http://localhost:5000/api/hotels", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
    })
    .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "فشل الحجز");
        showMessage("تم الحجز بنجاح ✔", "success");
        document.getElementById("bookingForm").reset();
        currentStep = 1;
        updateSteps();
    })
    .catch(err => {
        showMessage(err.message);
    });
});

/* =======================
   تهيئة
======================= */
addGuest();

/* تحميل الفنادق من JSON */
fetch('hotels.json')
    .then(res => res.json())
    .then(data => {
        const hotelSelect = document.getElementById('hotelName');
        hotelSelect.innerHTML = '<option value="">اختر الفندق</option>';

        data.forEach(hotel => {
            const option = document.createElement('option');
            option.value = hotel.name;
            option.textContent = hotel.name;
            hotelSelect.appendChild(option);
        });
    });
