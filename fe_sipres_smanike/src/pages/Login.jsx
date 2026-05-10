import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, UserCircle, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.role) {
      alert("Silakan pilih role!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5001/api/auth/login',
        {
          username: loginData.username,
          password: loginData.password,
          role: loginData.role
        }
      );

      if (response.data.status === "success") {
        const { access_token, user } = response.data;

        // ========================
        // SIMPAN LOCALSTORAGE
        // ========================
        localStorage.setItem("token", access_token);
        localStorage.setItem("user_role", user.role);
        localStorage.setItem("user_id", user.id);
        localStorage.setItem("siswa_id", user.siswa_id);
        localStorage.setItem("user", JSON.stringify(user));

        // ========================
        // ROUTE AMAN
        // ========================
        const routes = {
          siswa: "/siswa/Dashboard-siswa",
          guru: "/guru/Dashboard-guru",
          kepsek: "/kepsek/Dashboard-kepsek",
          staf: "/staff/Dashboard-staff",
          superadmin: "/superadmin/Dashboard-superadmin"
        };

        const targetRoute = routes[user.role];

        if (!targetRoute) {
          alert("Role tidak dikenali!");
          return;
        }

        alert(response.data.message || "Login berhasil");

        setTimeout(() => {
          navigate(targetRoute);
        }, 150);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login gagal / server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5e6d3] to-[#e8d2b8] flex items-center justify-center px-5 pt-24 pb-10 font-sans">

      <div className="bg-white w-full max-w-[550px] px-8 md:px-[60px] py-[40px] rounded-[30px] shadow-xl border-2 border-[#3e2723]">

        <h2 className="text-center text-[#3e2723] text-2xl font-extrabold mb-8">
          LOGIN <span className="text-[#E67E22]">AKUN</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* USERNAME */}
          <div>
            <label className="font-bold text-sm">Username</label>
            <div className="relative flex items-center border rounded-xl">
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                className="w-full h-12 pl-4 pr-12 outline-none"
                required
              />
              <UserCircle className="absolute right-3 text-gray-500" />
            </div>
          </div>

          {/* ROLE */}
          <div>
            <label className="font-bold text-sm">Role</label>
            <div className="relative flex items-center border rounded-xl">
              <select
                name="role"
                value={loginData.role}
                onChange={handleChange}
                className="w-full h-12 pl-4 pr-12 outline-none bg-white"
                required
              >
                <option value="">-- Pilih Role --</option>
                <option value="siswa">Siswa</option>
                <option value="guru">Guru</option>
                <option value="kepsek">Kepala Sekolah</option>
                <option value="staf">Staff</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
              <ShieldCheck className="absolute right-3 text-gray-500" />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="font-bold text-sm">Password</label>
            <div className="relative flex items-center border rounded-xl">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full h-12 pl-4 pr-12 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#3e2723] text-white rounded-xl font-bold"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>

          {/* FOOTER */}
          <div className="flex justify-between text-sm mt-4">
            <Link to="/daftar" className="text-[#6d4c41] font-bold">
              Daftar
            </Link>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-[#6d4c41] font-bold"
            >
              Kembali
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;