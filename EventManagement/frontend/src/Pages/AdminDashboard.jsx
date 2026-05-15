import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const AdminDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [addingAdmin, setAddingAdmin] = useState(false);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [statsRes, bookingsRes, usersRes, adminsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/bookings/stats", { headers }),
        axios.get("http://localhost:5000/api/bookings/all", { headers }),
        axios.get("http://localhost:5000/api/admin/users", { headers }),
        axios.get("http://localhost:5000/api/admin/admins", { headers }),
      ]);
      setStats(statsRes.data);
      setBookings(bookingsRes.data);
      setUsers(usersRes.data);
      setAdmins(adminsRes.data);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}/status`,
        { bookingStatus: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Status updated");
      fetchAll();
    } catch { toast.error("Update failed"); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted");
      fetchAll();
    } catch { toast.error("Delete failed"); }
  };

  const deleteAdmin = async (id) => {
    if (!window.confirm("Remove this admin?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Admin removed");
      fetchAll();
    } catch { toast.error("Delete failed"); }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setAddingAdmin(true);
    try {
      await axios.post("http://localhost:5000/api/admin/create-admin", newAdmin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Admin ${newAdmin.name} created!`);
      setShowAddAdmin(false);
      setNewAdmin({ name: "", email: "", password: "", phone: "", address: "" });
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create admin");
    } finally {
      setAddingAdmin(false);
    }
  };

  const statusColor = (s) => ({ confirmed: "#16a34a", pending: "#d97706", cancelled: "#dc2626", completed: "#2563eb" }[s] || "#666");

  const maxRevenue = stats?.monthlyRevenue?.length
    ? Math.max(...stats.monthlyRevenue.map(m => m.revenue))
    : 1;

  if (loading) return (
    <div className="dash-loading">
      <div className="big-spinner" />
      <p>Loading Dashboard...</p>
    </div>
  );

  return (
    <div className="admin-dash">
      {/* Topbar */}
      <div className="dash-topbar">
        <div className="topbar-left">
          <h1>EventHub Admin</h1>
          <span>Dashboard</span>
        </div>
        <div className="topbar-right">
          <span className="admin-greeting">{user?.name}</span>
          <button onClick={() => { logout(); navigate("/"); }} className="dash-logout">Logout</button>
        </div>
      </div>

      <div className="dash-body">
        {/* Sidebar */}
        <aside className="dash-sidebar">
          {[
            { key: "overview", icon: "📊", label: "Overview" },
            { key: "bookings", icon: "📋", label: "Bookings" },
            { key: "users",    icon: "👥", label: "Users" },
            { key: "revenue",  icon: "💰", label: "Revenue" },
            { key: "admins",   icon: "🔑", label: "Admins", badge: admins.length },
          ].map(item => (
            <button
              key={item.key}
              className={`sidebar-btn ${activeTab === item.key ? "active" : ""}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span>{item.icon}</span>
              {item.label}
              {item.badge !== undefined && (
                <span className="sidebar-badge">{item.badge}</span>
              )}
            </button>
          ))}

          <div className="sidebar-divider" />

          {/* <button className="sidebar-btn add-admin-btn" onClick={() => setShowAddAdmin(true)}>
            <span>➕</span> Add Admin
          </button> */}
        </aside>

        {/* Content */}
        <main className="dash-content">

          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div>
              <h2 className="dash-section-title">Dashboard Overview</h2>
              <div className="stat-cards">
                <div className="stat-card blue"><div className="stat-icon">📋</div><div><p>Total Bookings</p><h3>{stats?.totalBookings ?? 0}</h3></div></div>
                <div className="stat-card green"><div className="stat-icon">💰</div><div><p>Total Revenue</p><h3>₹{stats?.totalRevenue?.toLocaleString() ?? 0}</h3></div></div>
                <div className="stat-card orange"><div className="stat-icon">⏳</div><div><p>Pending</p><h3>{stats?.pendingBookings ?? 0}</h3></div></div>
                <div className="stat-card purple"><div className="stat-icon">✅</div><div><p>Confirmed</p><h3>{stats?.confirmedBookings ?? 0}</h3></div></div>
                <div className="stat-card red"><div className="stat-icon">❌</div><div><p>Cancelled</p><h3>{stats?.cancelledBookings ?? 0}</h3></div></div>
                <div className="stat-card teal"><div className="stat-icon">👥</div><div><p>Registered Users</p><h3>{users.length}</h3></div></div>
              </div>
              {stats?.serviceStats?.length > 0 && (
                <div className="dash-panel">
                  <h3>📈 Service Popularity</h3>
                  <div className="service-bars">
                    {stats.serviceStats.map(s => (
                      <div key={s._id} className="service-bar-row">
                        <span className="bar-label">{s._id}</span>
                        <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.min((s.count / (stats.totalBookings || 1)) * 100, 100)}%` }} /></div>
                        <span className="bar-count">{s.count} bookings</span>
                        <span className="bar-revenue">₹{s.revenue?.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="dash-panel">
                <h3>🕐 Recent Bookings</h3>
                <div className="mini-table">
                  <div className="mini-thead"><span>Customer</span><span>Service</span><span>Amount</span><span>Status</span></div>
                  {bookings.slice(0, 5).map(b => (
                    <div key={b._id} className="mini-row">
                      <span>{b.userName}</span><span>{b.serviceType}</span>
                      <span>₹{b.totalAmount?.toLocaleString()}</span>
                      <span><span className="status-pill" style={{ background: statusColor(b.bookingStatus) + "20", color: statusColor(b.bookingStatus) }}>{b.bookingStatus}</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── BOOKINGS ── */}
          {activeTab === "bookings" && (
            <div>
              <h2 className="dash-section-title">All Bookings ({bookings.length})</h2>
              <div className="bookings-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr><th>Customer</th><th>Service / Venue</th><th>Date</th><th>Guests</th><th>Amount</th><th>Payment</th><th>Status</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b._id}>
                        <td><div className="td-customer"><strong>{b.userName}</strong><span>{b.userEmail}</span></div></td>
                        <td><div className="td-service"><strong>{b.serviceType}</strong><span>{b.venueName}</span></div></td>
                        <td>{new Date(b.eventDate).toLocaleDateString("en-IN")}</td>
                        <td>{b.guestCount}</td>
                        <td><strong>₹{b.totalAmount?.toLocaleString()}</strong></td>
                        <td><span className={`pay-tag ${b.paymentStatus}`}>{b.paymentStatus}</span></td>
                        <td><span className="status-pill" style={{ background: statusColor(b.bookingStatus) + "20", color: statusColor(b.bookingStatus) }}>{b.bookingStatus}</span></td>
                        <td>
                          <select value={b.bookingStatus} onChange={(e) => updateStatus(b._id, e.target.value)} className="status-select">
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── USERS ── */}
          {activeTab === "users" && (
            <div>
              <h2 className="dash-section-title">Registered Users ({users.length})</h2>
              <div className="users-grid">
                {users.map(u => (
                  <div key={u._id} className="user-card">
                    <div className="user-avatar">{u.name?.charAt(0).toUpperCase()}</div>
                    <div className="user-info">
                      <h4>{u.name}</h4><p>{u.email}</p>
                      <p>{u.phone || "No phone"}</p>
                      <p className="joined">Joined {new Date(u.createdAt).toLocaleDateString("en-IN")}</p>
                    </div>
                    <button className="delete-user-btn" onClick={() => deleteUser(u._id)}>🗑️</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── REVENUE ── */}
          {activeTab === "revenue" && (
            <div>
              <h2 className="dash-section-title">Revenue Analytics</h2>
              <div className="rev-summary">
                <div className="rev-card"><span>💰 Total Revenue</span><strong>₹{stats?.totalRevenue?.toLocaleString() ?? 0}</strong></div>
                <div className="rev-card"><span>📋 Paid Bookings</span><strong>{stats?.confirmedBookings ?? 0}</strong></div>
                <div className="rev-card"><span>📊 Avg per Booking</span><strong>₹{stats?.confirmedBookings ? Math.round(stats.totalRevenue / stats.confirmedBookings).toLocaleString() : 0}</strong></div>
              </div>
              {stats?.monthlyRevenue?.length > 0 && (
                <div className="dash-panel">
                  <h3>📅 Monthly Revenue</h3>
                  <div className="bar-chart">
                    {stats.monthlyRevenue.map((m, i) => (
                      <div key={i} className="chart-col">
                        <span className="chart-value">₹{(m.revenue / 1000).toFixed(0)}K</span>
                        <div className="chart-bar-wrap"><div className="chart-bar" style={{ height: `${Math.max((m.revenue / maxRevenue) * 180, 8)}px` }} /></div>
                        <span className="chart-label">{MONTHS[(m._id.month - 1)]}</span>
                        <span className="chart-count">{m.count} bkgs</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {stats?.serviceStats?.length > 0 && (
                <div className="dash-panel">
                  <h3>🏷️ Revenue by Service</h3>
                  <table className="rev-table">
                    <thead><tr><th>Service</th><th>Bookings</th><th>Revenue</th><th>Avg</th></tr></thead>
                    <tbody>
                      {stats.serviceStats.map(s => (
                        <tr key={s._id}><td>{s._id}</td><td>{s.count}</td><td><strong>₹{s.revenue?.toLocaleString()}</strong></td><td>₹{s.count ? Math.round(s.revenue / s.count).toLocaleString() : 0}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── ADMINS ── */}
          {activeTab === "admins" && (
            <div>
              <div className="dash-section-header">
                <h2 className="dash-section-title">Admin Accounts ({admins.length})</h2>
                <button className="add-admin-cta" onClick={() => setShowAddAdmin(true)}>➕ Add New Admin</button>
              </div>
              <div className="users-grid">
                {admins.map(a => (
                  <div key={a._id} className="user-card admin-card">
                    <div className="user-avatar admin-avatar">{a.name?.charAt(0).toUpperCase()}</div>
                    <div className="user-info">
                      <h4>{a.name} <span className="admin-tag">🔑 Admin</span></h4>
                      <p>{a.email}</p>
                      <p>{a.phone || "No phone"}</p>
                      {/* <p className="joined">Since {new Date(a.createdAt).toLocaleDateString("en-IN")}</p> */}
                    </div>
                    {a._id !== user?._id && (
                      <button className="delete-user-btn" onClick={() => deleteAdmin(a._id)}>🗑️</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ── ADD ADMIN MODAL ── */}
      {showAddAdmin && (
        <div className="modal-overlay" onClick={() => setShowAddAdmin(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🔑 Add New Admin</h3>
              <button className="modal-close" onClick={() => setShowAddAdmin(false)}>✕</button>
            </div>
            <form onSubmit={handleAddAdmin} className="modal-form">
              <div className="modal-field">
                <label>Full Name *</label>
                <input type="text" placeholder="e.g. Rahul Sharma" required
                  value={newAdmin.name} onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })} />
              </div>
              <div className="modal-field">
                <label>Email *</label>
                <input type="email" placeholder="admin@example.com" required
                  value={newAdmin.email} onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })} />
              </div>
              <div className="modal-field">
                <label>Password *</label>
                <input type="password" placeholder="Min 6 characters" required minLength={6}
                  value={newAdmin.password} onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })} />
              </div>
              <div className="modal-field">
                <label>Phone</label>
                <input type="text" placeholder="+91 98765 XXXXX"
                  value={newAdmin.phone} onChange={e => setNewAdmin({ ...newAdmin, phone: e.target.value })} />
              </div>
              <div className="modal-field">
                <label>Address</label>
                <input type="text" placeholder="City, State"
                  value={newAdmin.address} onChange={e => setNewAdmin({ ...newAdmin, address: e.target.value })} />
              </div>
              <div className="modal-actions">
                <button type="button" className="modal-cancel" onClick={() => setShowAddAdmin(false)}>Cancel</button>
                <button type="submit" className="modal-submit" disabled={addingAdmin}>
                  {addingAdmin ? "Creating..." : "Create Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;