import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../app/store';
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { accessToken } = useSelector((s: RootState) => s.auth);
  return accessToken ? <>{children}</> : <Navigate to="/login" replace />;
}
