import gql from 'graphql-tag';
import { apiRequest } from './common';

export const eventTickets = gql`
    query ($type_id: Int!) {
        tickets(type_id: $type_id) {
          PK_iMaVe
          FK_iMaLoaiVe
          sViTri
          iGiave
          iTrangThai
        }
    }
`;

export const eventTicketTypes = gql`
    query ($sub_event_ids: [String]) {
      ticketsTypeEvent(sub_event_ids: $sub_event_ids) {
          PK_iMaLoaiVe
          FK_iMaCTSuKien
          sTenLoaiVe
          iSoLuong
          iGiave
          sPhanLoai
        }
    }
`;

export const categoriesQuery = gql`
    query {
		categories {
			PK_iMaTheloai
			sTenTheloai
			sSlugTheloai
			sLinkAnh
        }
    }
`;

export const categoryQuery = gql`
    query ($id: Int!) {
		cat(id: $id) {
			PK_iMaTheloai
			sTenTheloai
			sSlugTheloai
			sLinkAnh
        }
    }
`;

export const catEventsQuery = gql`
    query ($id: Int!) {
		catEventsId(id: $id) {
			PK_iMaSukien
            sTenSukien
            sSlugSukien
            dThoigianBatdau
            dThoigianKetthuc
            sMota
            sDiadiem
            sLinkanh
            eventDetails
        }
    }
`;

export const getCategories = () => {
    return apiRequest(categoriesQuery);
}
export const getCat = (variables) => {
    return apiRequest(categoryQuery, variables);
}

export const getCatEvents = (variables) => {
    return apiRequest(catEventsQuery, variables);
}
