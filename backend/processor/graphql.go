package processor

import (
	"fmt"
	"log"

	"nmatute.com/web-nmatute-backend/graph"
	"nmatute.com/web-nmatute-backend/graph/model"
)

const (
	INDEX_PROFESSIONAL_EXP = 0
	INDEX_EDUCATION        = 1
	INDEX_TOOL             = 2
	INDEX_LANG             = 3
)

func ParseDataToSchema() error {
	for i, data := range MyData {
		switch data.Name {
		case "professional-exp":
			log.Println("Parsing jobs...")
			itemList := make([]model.Item, 0)
			for _, item := range data.Items {
				var name, role, start, end, stringValue string
				var tasks []*string
				var list []string
				var number int
				var ok bool

				stringValue, _, _, ok = AssertType(item["name"])
				if ok {
					name = stringValue
				}
				stringValue, _, _, ok = AssertType(item["role"])
				if ok {
					role = stringValue
				}
				_, number, _, ok = AssertType(item["start"])
				if ok {
					start = fmt.Sprintf("%d", number)
				}
				if endAux, ok := item["end"]; ok {
					_, number, _, ok = AssertType(endAux)
					if ok {
						end = fmt.Sprintf("%d", number)
					}
				}
				if end == "" {
					end = CURRENTLY_STATUS
				}
				_, _, list, ok = AssertType(item["tasks"])
				if ok {
					tasks = make([]*string, len(list))
					for i, v := range list {
						tasks[i] = &v
					}
				}
				itemList = append(itemList, model.Item{
					Content: &model.Content{
						Name:  &name,
						Role:  &role,
						Start: &start,
						End:   &end,
						Tasks: tasks,
					},
				})
			}
			pointerList := make([]*model.Item, len(itemList))
			for i, v := range itemList {
				pointerList[i] = &v
			}
			graph.DataSections = append(graph.DataSections, model.DataSection{
				Name:  data.Name,
				Items: pointerList,
			})

		case "education", "projects":
			log.Println("Parsing education...")
			itemList := make([]model.Item, 0)
			for _, item := range data.Items {
				var name, title, url, start, end, stringValue string
				var number int
				var titleAux, startAux, urlAux, endAux interface{}
				var ok bool

				stringValue, _, _, ok = AssertType(item["name"])
				if ok {
					name = stringValue
				}
				if titleAux, ok = item["title"]; ok {
					stringValue, _, _, ok = AssertType(titleAux)
					if ok {
						title = stringValue
					}
				}
				if urlAux, ok = item["url"]; ok {
					stringValue, _, _, ok = AssertType(urlAux)
					if ok {
						url = stringValue
					}
				}
				if startAux, ok = item["start"]; ok {
					_, number, _, ok = AssertType(startAux)
					if ok {
						start = fmt.Sprintf("%d", number)
					}
				}
				if endAux, ok = item["end"]; ok {
					_, number, _, ok = AssertType(endAux)
					if ok {
						end = fmt.Sprintf("%d", number)
					}
				}
				if end == "" {
					end = CURRENTLY_STATUS
				}
				itemList = append(itemList, model.Item{
					Content: &model.Content{
						Name:  &name,
						Title: &title,
						Start: &start,
						End:   &end,
						URL:   &url,
					},
				})
			}
			pointerList := make([]*model.Item, len(itemList))
			for i, v := range itemList {
				pointerList[i] = &v
			}
			graph.DataSections = append(graph.DataSections, model.DataSection{
				Name:  data.Name,
				Items: pointerList,
			})

		case "tools-skills", "languages":
			log.Println("Parsing keywords...")
			for _, item := range data.Items {
				var keywords []string
				_, _, list, ok := AssertType(item["keywords"])
				if ok {
					keywords = list
				}
				pointerList := make([]*string, len(keywords))
				for i, v := range keywords {
					pointerList[i] = &v
				}
				graph.DataSections = append(graph.DataSections, model.DataSection{
					Name:  data.Name,
					Items: []*model.Item{{Keywords: pointerList}},
				})
			}

		default:
			return fmt.Errorf("error: ParseDataToSchema\tUnknown index %d", i)
		}
	}

	return nil
}
