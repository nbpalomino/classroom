import { postFiles, postLogin, getSessions } from '~/src/util/http'
import { formatDate, FORMATS } from '~/src/util/date'
import alert from '~/src/util/alert'

const App = function () {
    return {
        title: "Sistema de Apoyo",
        user: {},
        course: {},
        session: {},
        isLoading: false,
        files: [],
        courses: [
        ],
        stage: {
            login: false,
            courses: false,
            upload: false,
        },
        doLogin() {
            if (!this.user.dni) return;

            let data = {
                'dni': this.user.dni,
                'pass': this.user.password,
            };
            console.dir(data);
            this.isLoading = true;
            postLogin(data, (res) => {
                this.isLoading = false;
                if (res.status === 200) {
                    this.user = res.data;
                    localStorage.setItem('user', JSON.stringify(this.user));
                    // localStorage.setItem('user.expire', (new Date()));
                    this.showModule('courses');
                    this.loadSessions();
                }
            }).catch(err => this.isLoading = false);
        },
        loadSessions() {
            getSessions(this.user.seccion_id, (res) => {
                if (res.status === 200) {
                    this.courses = res.data;
                }
            }).catch(err => this.isLoading = false);
        },
        openCourse(session, course) {
            if (!session.is_open) return;

            this.course = course;
            this.session = session;
            this.showModule('upload');
        },
        sendFiles(e) {
            console.log("Enviando archivos ... ");
            console.dir(this.files);
            this.isLoading = true;
            let formData = new FormData();

            Array.from(this.files).map((file, index) => {
                formData.append(`files[${index}]`, file);
            })
            formData.append('dni', this.user.dni);
            formData.append('session_id', this.session.id);
            formData.append('course', this.course.curso_desc);
            formData.append('date', formatDate(this.session.fecha_inicio, FORMATS.DATE));

            postFiles(formData, (res) => {
                console.dir(res);
                if (res.status === 200) {
                    alert("Archivos enviados correctamente!");
                    this.files = [];
                    this.showModule('courses');
                }
                this.isLoading = false;
            }).catch(err => this.isLoading = false);
        },
        filesLoaded(e) {
            console.log("Loaded files");
            console.dir(e);
            this.files = e.target.files;

            // if (file !== undefined) {
            //     this.file = file.name;
            // } else {
            //     this.file = null;
            // }
        },
        getDate(date) {
            return formatDate(date);
        },
        getSimpleDate(date) {
            return formatDate(date, FORMATS.DATE_ONLY);
        },
        showModule(mod) {
            this.stage.login = false;
            this.stage.courses = false;
            this.stage.upload = false;
            this.stage[mod] = true;
            console.log(`Showing module ${mod}`);
        },
        init() {
            console.log("Starting app...");
            this.showModule('login');
        }
    }
}

window.App = App;