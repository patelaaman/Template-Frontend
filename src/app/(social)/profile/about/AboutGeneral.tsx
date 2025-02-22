import React, { useEffect, useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  Target, 
  Users, 
  TrendingUp,
  Lightbulb,
  HandshakeIcon,
  GraduationCap,
  Settings,
  Loader2,
  Trash,
  PenLine
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { LIVE_URL } from '@/utils/api';

interface BusinessProfile {
  id: string;
  currentRole: string;
  UserId: string;
  companyName: string;
  location: string;
  businessType: string;
  areasOfExpertise: string;
  joiningReason: string;
  contentPreferences: string[];
  collaborationInterest: string;
  businessStage: string;
  hasPartnerships: string;
  hasEntrepreneurialExperience: string;
  primaryGoals: string;
}
const Card = ({ children, className = '' }) => (
    <div className={`card shadow-sm border-0 ${className}`} style={{
      borderRadius: '16px',
      backgroundColor: '#fff',
      marginBottom: '24px'
    }}>
      {children}
    </div>
  );

const SectionTitle = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="d-flex align-items-center mb-4">
    <div style={{
      padding: '12px',
      backgroundColor: '#EBF5FF',
      borderRadius: '12px',
      marginRight: '16px'
    }}>
      <Icon style={{ width: '24px', height: '24px', color: '#2563EB' }} />
    </div>
    <h2 className="h4 mb-0" style={{ color: '#111827' }}>{title}</h2>
  </div>
);

const InfoItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div style={{
    padding: '16px',
    backgroundColor: '#F9FAFB',
    borderRadius: '12px',
    marginBottom: '16px'
  }}>
    <div className="d-flex align-items-center">
      <Icon style={{ width: '20px', height: '20px', color: '#2563EB', marginRight: '12px' }} />
      <div>
        <p className="small mb-1" style={{ color: '#6B7280' }}>{label}</p>
        <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>{value}</p>
      </div>
    </div>
  </div>
);

const BusinessProfileCard: React.FC<{ profile: BusinessProfile }> = ({ profile }) => {

const {id} = useParams()
const navigate = useNavigate()
    
    const handleDelete = async () => {
        try {
          await fetch(`${LIVE_URL}api/v1/general/delete/${id}`, {
            method: "DELETE",
          });
          await fetch(`${LIVE_URL}api/v1/subrole/delete/${id}`, {
            method: "DELETE",
          });
          window.location.reload();
        } catch (error) {
          console.error("Error while deleting:", error);
          alert("Unable to delete Business Buyer and Subrole");
        }
      };

  return (
    <div className="container-fluid" style={{ maxWidth: '1350px' }}>
      {/* Profile Overview */}
      <Card className="p-4 p-lg-5">
        <div className="d-flex align-items-center mb-4">
          <div style={{
            padding: '20px',
            backgroundColor: '#EBF5FF',
            borderRadius: '16px',
            marginRight: '24px'
          }}>
            <Building2 style={{ width: '48px', height: '48px', color: '#2563EB' }} />
          </div>
          <div>
            <h1 className="h2 mb-1" style={{ color: '#111827', fontWeight: '700' }}>
              {profile.data.companyName}
            </h1>
            <p className="h5 mb-0" style={{ color: '#6B7280' }}>
              <MapPin style={{ width: '16px', height: '16px', marginRight: '8px' }} />
              {profile.data.location}
            </p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div style={{
              padding: '16px',
              backgroundColor: '#EBF5FF',
              borderRadius: '12px',
              height: '100%'
            }}>
              <div className="d-flex align-items-center">
                <Briefcase style={{ width: '20px', height: '20px', color: '#2563EB', marginRight: '12px' }} />
                <div>
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Business Type</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {profile.data.businessType}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div style={{
              padding: '16px',
              backgroundColor: '#F0FDF4',
              borderRadius: '12px',
              height: '100%'
            }}>
              <div className="d-flex align-items-center">
                <Target style={{ width: '20px', height: '20px', color: '#16A34A', marginRight: '12px' }} />
                <div>
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Business Stage</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {profile.data.businessStage}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div style={{
              padding: '16px',
              backgroundColor: '#F3E8FF',
              borderRadius: '12px',
              height: '100%'
            }}>
              <div className="d-flex align-items-center">
                <Lightbulb style={{ width: '20px', height: '20px', color: '#9333EA', marginRight: '12px' }} />
                <div>
                  <p className="small mb-1" style={{ color: '#6B7280' }}>Primary Goals</p>
                  <p className="mb-0 fw-semibold" style={{ color: '#111827' }}>
                    {profile.data.primaryGoals}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Expertise & Experience and Collaboration & Interests */}
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <Card className="p-4">
            <SectionTitle icon={GraduationCap} title="Expertise & Experience" />
            <InfoItem 
              icon={Briefcase}
              label="Current Role"
              value={profile.data.currentRole}
            />
            <InfoItem 
              icon={TrendingUp}
              label="Areas of Expertise"
              value={profile.data.areasOfExpertise}
            />
            <InfoItem 
              icon={GraduationCap}
              label="Entrepreneurial Experience"
              value={profile.data.hasEntrepreneurialExperience}
            />
          </Card>
        </div>

        <div className="col-12 col-md-6">
          <Card className="p-4">
            <SectionTitle icon={Users} title="Collaboration & Interests" />
            <InfoItem 
              icon={HandshakeIcon}
              label="Collaboration Interest"
              value={profile.data.collaborationInterest}
            />
            <InfoItem 
              icon={Users}
              label="Partnerships"
              value={profile.data.hasPartnerships}
            />
            <div style={{
              padding: '16px',
              backgroundColor: '#F9FAFB',
              borderRadius: '12px'
            }}>
              <p className="small mb-2" style={{ color: '#6B7280' }}>Content Preferences</p>
              <div className="d-flex flex-wrap gap-2">
                {profile.data.contentPreferences.map((pref, index) => (
                  <span 
                    key={index}
                    className="badge"
                    style={{
                      backgroundColor: '#DBEAFE',
                      color: '#1E40AF',
                      padding: '6px 12px',
                      borderRadius: '9999px',
                      fontWeight: '500'
                    }}
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Joining Reason */}
      <Card className="p-4">
        <SectionTitle icon={Lightbulb} title="Joining Reason" />
        <div style={{
          padding: '16px',
          backgroundColor: '#F9FAFB',
          borderRadius: '12px'
        }}>
          <p className="mb-0" style={{ color: '#374151', lineHeight: '1.6' }}>
            {profile.data.joiningReason}
          </p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-end mt-4">
      <button
          className="btn btn-primary"
          style={{
            backgroundColor: '#2563EB',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontWeight: '500'
          }}
          onClick={() => navigate(`/profile/editgeneral/${id}`)}
        >
          Edit Profile
        </button>
        <button
          className="btn btn-danger d-flex align-items-center gap-2"
          style={{
            backgroundColor: '#DC2626',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontWeight: '500'
          }}
          onClick={handleDelete}
        >
          <Trash style={{ width: '20px', height: '20px' }} />
          Delete Profile
        </button>
      </div>
    </div>
  );
};

const AboutGeneral = () => {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


const {id} = useParams()


  useEffect(() => {
    const fetchProfile= async () => {
      try {
        const response = await fetch(`${LIVE_URL}api/v1/general/get/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfile(Array.isArray(data) ? data[0] : data);

        setError(null);
      } catch (err) {
        console.error('Error fetching businesses:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
        
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="text-center">
          <Loader2 className="mb-3" style={{
            width: '48px',
            height: '48px',
            color: '#2563EB',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#6B7280' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '24px' }}>
        <div className="container-fluid" style={{ maxWidth: '1280px' }}>
          <div className="alert alert-danger mb-4" role="alert" style={{ borderRadius: '12px' }}>
            <strong>Error!</strong>
            <span className="ms-2">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '', minHeight: '100vh', padding: '' }}>
      {profile && <BusinessProfileCard profile={profile} />}
    </div>
  );
};

export default AboutGeneral;