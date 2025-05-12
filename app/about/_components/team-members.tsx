// components/TeamMembersSection.tsx
"use client"; // Vẫn giữ "use client" nếu bạn có các tương tác khác sau này, hoặc bỏ đi nếu section này hoàn toàn tĩnh

import React from 'react'; // Bỏ useState nếu không còn state nào
import Image from 'next/image';
// Không cần import MemberModal nữa
// Không cần import Link nếu "Read More" bị bỏ

interface Member {
  id: number;
  imageUrl: string;
  name: string;
  title: string;
  // Không cần readMoreLink hoặc bio
}

interface TeamMembersSectionProps {
  members?: Member[];
  sectionTitle?: string;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  // Không cần modalCardBackgroundColor
}

const defaultMembers: Member[] = [
  {
    id: 1,
    imageUrl: "/chure.jpg",
    name: "Van Nguyen",
    title: "Founder/ CEO",
  },
  {
    id: 2,
    imageUrl: "/chure.jpg", // Đã đổi thành /chure.jpg
    name: "Linh Ngo",
    title: "Co-Owner/ North Market Manager",
  },
  {
    id: 3,
    imageUrl: "/chure.jpg", // Đã đổi thành /chure.jpg
    name: "Thao Vu",
    title: "Senior Wedding Planner",
  },
  // Thêm các thành viên khác
];

const TeamMembersSection: React.FC<TeamMembersSectionProps> = ({
  members = defaultMembers,
  sectionTitle,
  backgroundColor = "bg-white",
  cardBackgroundColor = "bg-[#f9f5ef]",
  // modalCardBackgroundColor không cần nữa
}) => {
  // Không cần state selectedMember và các hàm open/closeModal nữa
  // const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  // const openModal = (member: Member) => { setSelectedMember(member); };
  // const closeModal = () => { setSelectedMember(null); };

  const processedMembers = members.map(member => ({
    ...member,
    imageUrl: "/chure.jpg", // Đảm bảo tất cả đều là /chure.jpg
    alt: member.name || "Team member",
  }));

  if (!processedMembers || processedMembers.length === 0) {
    return null; // Hoặc một thông báo nếu không có thành viên
  }

  return (
    // Bỏ Fragment <> </> nếu không còn Modal ở cùng cấp
    <div className={`${backgroundColor} py-12 md:py-16 lg:py-20`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {sectionTitle && (
          <h2 className="text-3xl md:text-4xl font-serif text-center text-gray-800 mb-10 md:mb-12 lg:mb-16">
            {sectionTitle}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {processedMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col overflow-hidden shadow-lg group"
            >
              <div className="relative w-full aspect-[3/3.8] sm:aspect-[3/3.8] md:aspect-[3/4]">
                <Image
                  src={member.imageUrl}
                  alt={member.alt}
                  layout="fill"
                  objectFit="cover"
                  quality={85}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className={`${cardBackgroundColor} p-6 text-center flex-grow flex flex-col`}>
                <h3 className="font-serif text-xl lg:text-2xl text-gray-800 font-semibold mb-1">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 flex-grow"> {/* Bỏ mb-4 nếu không có nút Read More */}
                  {member.title}
                </p>
                {/* Nút "Read More..." đã được loại bỏ */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Component Modal đã được loại bỏ */}
      {/* 
      <MemberModal
        member={selectedMember ? { ... } : null}
        onClose={closeModal}
        cardBackgroundColor={modalCardBackgroundColor}
      />
      */}
    </div>
  );
};

export default TeamMembersSection;