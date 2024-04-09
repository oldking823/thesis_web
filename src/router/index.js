import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import SystemAdmin from "../views/SystemAdmin";
import StudentAdd from "../views/StudentAdd";


import StudentManager from "../views/StudentManager";
import StudentUpdate from "../views/StudentUpdate";
import AbsentRecord from "../views/AbsentRecord";
import DormitoryAdmin from "../views/TeacherAdmin";
import Student from "@/views/Student";
import StudentSearch from "@/views/StudentSearch";
import TeacherManager from "@/views/TeacherManager";
import TeacherUpdate from "@/views/TeacherUpdate";
import TeacherAdds from "@/views/TeacherAdds";
import TeacherAdd from "@/views/TeacherAdd";
import MyStudent from "@/views/MyStudent";
import MyStudentUpdate from "@/views/MyStudentUpdate";
import ThesisManager from "@/views/ThesisManager";
import ThesisUpload from "@/views/ThesisUpload";
import AdminUpload from "@/views/AdminUpload";
import AdminTeaUpload from "@/views/AdminTeaUpload";
import TeacherAdmin from "@/views/TeacherAdmin";
import TeacherSearch from "@/views/TeacherSearch";
import MyTeacher from "@/views/MyTeacher";

Vue.use(VueRouter)


const routes = [
    {
        path: '/teacherAdmin',
        name: '导师客户端',
        component: TeacherAdmin,
        redirect: '/myStudent',
        children: [
            {
                path: '/myStudent',
                name: '我的学生',
                component: MyStudent
            },
            {
                path: '/teacherSearch',
                name: '我的学生',
                component: TeacherSearch
            },

            {
                path: '/myStudentUpdate',
                name: '批改论文',
                component: MyStudentUpdate
            }
        ]
    },
    {
        path: '/systemAdmin',
        name: '系统管理员',
        component: SystemAdmin,
        redirect: '/studentManager',
        children: [

            {
                path: '/studentAdd',
                name: '添加学生',
                component: StudentAdd
            },

            {
                path: '/studentManager',
                name: '学生管理',
                component: StudentManager
            },
            {
                path: '/studentUpdate',
                name: '修改学生',
                component: StudentUpdate
            },
            {
                path: '/teacherAdd',
                name: '添加导师',
                component: TeacherAdd
            },
            {
                path: '/teacherAdds',
                name: '批量添加',
                component: TeacherAdds
            },
            {
                path: '/teacherManager',
                name: '导师管理',
                component: TeacherManager
            },
            {
                path: '/teacherUpdate',
                name: '修改导师信息',
                component: TeacherUpdate
            },
            {
                path: '/adminUpload',
                name: '学生批量导入',
                component: AdminUpload
            },
            {
                path: '/adminTeaUpload',
                name: '导师批量导入',
                component: AdminTeaUpload
            },
            {
                path: '/absentRecord',
                name: '论文总览',
                component: AbsentRecord
            }

        ]
    },
    {
        path: '/student',
        name: '学生查询',
        component: Student,
        redirect: '/StudentSearch',
        children: [
            {

                path: '/studentSearch',
                name: '个人信息',
                component: StudentSearch
            },
            {
                path: '/myTeacher',
                name: '选择导师',
                component: MyTeacher
            },
            {
                path: '/thesisManager',
                name: '我的论文',
                component: ThesisManager
            },
            {
                path: '/thesisUpload',
                name: '论文提交',
                component: ThesisUpload
            }
        ]

    },
    {
        path: '/',
        name: '登录',
        component: Login
    },
    {
        path: '/login',
        name: '登录',
        component: Login
    }
]

const router = new VueRouter({
    mode: 'history',
    //history
    base: process.env.BASE_URL,
    routes
})

export default router
