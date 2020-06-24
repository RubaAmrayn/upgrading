const Login = require("./loginText");
const Sign = require("./signText");
const Pages = require("./pagesText");
const About = require("./aboutText");
const Educational = require("./profile/educationalText");
const Info = require("./profile/infoText");
const Personal = require("./profile/personalText");
const Experience = require("./profile/experienceText");
const newCourseForm = require("./courses/newCourseForm");
const Reject = require("./trainerRequests/rejectTrainer");
const activeRequest = require("./trainerRequests/activeRequest");
const RequestBtn = require("./profile/requestBtn");
const InfoCourse = require("./courses/infoCourse");
const PosterAction = require("./courses/posterActions");
const CourseSuper = require("./courses/super");
const BriefcaseTrainer = require("./briefcse/trainer");
const BriefcaseSuper = require("./briefcse/super");
export default {
  badge: "شارة",
  close: "إغلاق",
  dataIterator: {
    noResultsText: "لا توجد سجلات مطابقة",
    loadingText: "تحميل العنصر..."
  },
  dataTable: {
    itemsPerPageText: "الصفوف لكل صفحة:",
    ariaLabel: {
      sortDescending: ": مفروز تنازلي. تنشيط لإزالة الفرز.",
      sortAscending: ": مفروز تصاعدي. تنشيط للفرز التنازلي.",
      sortNone: ": غير مفروزة. تفعيل لفرز تصاعدي."
    },
    sortBy: "مفروزة حسب"
  },
  dataFooter: {
    itemsPerPageText: "العناصر لكل صفحة:",
    itemsPerPageAll: "الكل",
    nextPage: "الصفحة التالية",
    prevPage: "الصفحة السابقة",
    firstPage: "الصفحة الأولى",
    lastPage: "الصفحة الأخيرة",
    pageText: "{0}-{1} من {2}"
  },
  datePicker: {
    itemsSelected: "{0} مختارة"
  },
  noDataText: "لا توجد بيانات متاحة",
  carousel: {
    prev: "البصري السابق",
    next: "البصري التالي",
    ariaLabel: {
      delimiter: "Carousel slide {0} of {1}"
    }
  },
  calendar: {
    moreEvents: "{0} أكثر"
  },
  fileInput: {
    counter: "{0} ملفات",
    counterSize: "{0} ملفات ({1} في المجموع)"
  },
  timePicker: {
    am: "صباحاً",
    pm: "مساءً"
  },
  Login,
  Sign,
  Pages,
  About,
  Educational,
  Info,
  Personal,
  Experience,
  newCourseForm,
  Reject,
  activeRequest,
  RequestBtn,
  InfoCourse,
  PosterAction,
  CourseSuper,
  BriefcaseTrainer,
  BriefcaseSuper
};
